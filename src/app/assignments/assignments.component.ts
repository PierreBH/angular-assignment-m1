import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {Assignment} from "./model/assignment.model";
import {AssignmentsService} from "../shared/assignments.service";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {$localize} from '@angular/localize/init';
import {Event, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

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
  test = "";
  assignementSelectionne!:Assignment;
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateRendu', 'rendu', 'modify'];
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

  constructor(private assignmentsService: AssignmentsService, private router: Router) {
    this.dataSourceAssignment = new MatTableDataSource(this.assignments);
  }

  ngAfterViewInit() {
    this.dataSourceAssignment.sort = this.sort;
  }

  ngOnInit(): void {
    this.onUpdate();
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssignment.filter = filterValue.trim().toLowerCase();
  }

  pageSuivante(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;

    this.onUpdate();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
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

  getAssignments() {
    this.assignmentsService.getAssignments().subscribe(assignments => {
      this.assignments = assignments;
      this.dataSourceAssignment = new MatTableDataSource(this.assignments);
    });
  }

  onNouvelAssignment(event: Assignment) {
    //this.assignments.push(event);w
    this.assignmentsService.addAssignment(event).subscribe(message => console.log(message));
    this.formVisible = false;
  }

  onClickEdit(event: Assignment){
    console.log(event)
    this.router.navigate(["/assignment", event?._id, 'edit']);
  }

  onClickView(event: Assignment){
    this.router.navigate(["/assignment", event?._id]);
  }

  assignmentClique(assignment:Assignment) {
    this.assignementSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");

        this.router.navigate(["/home"], {replaceUrl:true});
      })
  }
}
