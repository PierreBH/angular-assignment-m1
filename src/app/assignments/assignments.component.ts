import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {Assignment} from "./model/assignment.model";
import {AssignmentsService} from "../shared/assignments.service";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {$localize} from '@angular/localize/init';
import {Event, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {TokenStorageService} from "../shared/token.service";

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Première page`;
  itemsPerPageLabel = $localize`Nombre d'éléments par page :`;
  lastPageLabel = $localize`Dernière page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Page suivante';
  previousPageLabel = 'Page précédente';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    page+=1;
    const amountPages = Math.ceil(length / pageSize) ;
    return $localize`Page ${page} of ${amountPages}`;
  }
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})

export class AssignmentsComponent implements OnInit, AfterViewInit {
  titre = "Mon application sur les Assignments !";
  ajoutActive = false;
  formVisible = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean;
  userName: string;
  assignementSelectionne!:Assignment;
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateRendu', 'rendu', 'enRetard', 'modify'];
  dataSourceAssignment: MatTableDataSource<Assignment>;

  page: number=1;
  limit: number=10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;

  @ViewChild(MatSort) sort: MatSort;
  checked: string;

  constructor(private assignmentsService: AssignmentsService, private router: Router, private tokenService: TokenStorageService) {
    this.dataSourceAssignment = new MatTableDataSource(this.assignments);
  }

  ngAfterViewInit() {
    this.dataSourceAssignment.sort = this.sort;
    this.dataSourceAssignment.sortingDataAccessor = (item: IIndexable, property) => {
      switch (property) {
        case 'id': {
          if (item['_id']) { return item['_id']; }
          break;
        }
        case 'nom': {
          if (item['nom']) { return item['nom']; }
          break;
        }
        case 'dateRendu': {
          if (item['dateDeRendu']) { return item['dateDeRendu']; }
          break;
        }
        default:
          return item[property];
      }
    };
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn){
      const user = this.tokenService.getUser();
      this.isAdmin = user.isAdmin;

      this.userName = user.name;
    }
    this.dataSourceAssignment.filterPredicate =  ((record,filter) => {
      if(filter != null && (filter == "true" || filter == "false")){
        return record.rendu.toString() == filter;
      } else if(filter != null && filter != "") {
        return record.nom.toLocaleLowerCase() == filter.toLocaleLowerCase();
      } else {
        return true;
      }
    });
    this.onUpdate();
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssignment.filter = filterValue.trim().toLowerCase();
  }

  applyFilterCheckBox(event: string) {
    this.dataSourceAssignment.filter = event.toString();
  }

  isNull(elem?: any): boolean{
    return undefined === elem || null === elem;
  }

  isNotNull(elem?: any): boolean{
    return !this.isNull(elem);
  }

  checkStateActive(event: any, el: any) {
    event.preventDefault();
    if (this.isNotNull(this.checked) && this.checked === el.value) {
      el.checked = false;
      this.checked = "";
    } else {
      el.checked = true;
      this.checked = el.value;
    }
    this.applyFilterCheckBox(this.checked);
  }

  pageSuivante(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;

    this.onUpdate();
  }

  isDateDeRenduDepassee(dateDeRendu: Date) {
    return new Date(dateDeRendu) < new Date();
  }

  onUpdate(){
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        console.log("données reçues");
        this.dataSourceAssignment.data = data.docs;
      });
  }

  onClickEdit(event: Assignment){
    console.log(event)
    this.router.navigate(["/assignment", event?._id, 'edit']);
  }

  onClickView(event: Assignment){
    this.router.navigate(["/assignment", event?._id]);
  }

  onClickParams(){
    this.router.navigate(["/params"]);
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        this.onUpdate();
        this.router.navigate(["/home"], {replaceUrl:true});
      })
  }
}

export interface IIndexable {
  [key: string]: any;
}
