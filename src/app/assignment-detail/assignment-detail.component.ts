import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from "../assignments/model/assignment.model";
import {AssignmentsService} from "../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from "../shared/token.service";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis: Assignment | null | undefined;
  panelOpenState: boolean = false;
  isChecked: boolean = false;
  private isLoggedIn: boolean;
  private isAdmin: boolean;
  private userName: string;

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn){
      const user = this.tokenService.getUser();
      this.isAdmin = user.isAdmin;

      this.userName = user.name;
    }
    this.getAssignment();
  }

  getAssignment() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.assignmentsService.getAssignment(id)
        .subscribe(assignment => {
          this.assignmentTransmis = assignment;
          this.isChecked = assignment?.rendu ?? false;
        });
  }

  handleUpdateAssignment() {
    if(this.isLoggedIn){
      if(new Date(this.assignmentTransmis?.dateDeRendu ?? new Date()) > new Date()) {
        let assignment = this.assignmentTransmis ?? new Assignment();
        assignment.rendu = !this.assignmentTransmis?.rendu;
        this.assignmentsService.updateAssignment(assignment).subscribe(message => console.log(message));
        this.router.navigate(["/home"]).then(r => console.log(r));
      } else {
        this.isChecked = false;
        this.openSnackBar("La date de rendu est passée, vous ne pouvez pas modifier le devoir");
      }
    } else{
      this.router.navigate(["/connexion"]);
    }
  }

  handleDeleteAssignment() {
    if(this.isLoggedIn) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis ?? new Assignment()).subscribe((message) => {
        this.router.navigate(["/home"]).then(r => console.log(r));
      });
    } {
      this.router.navigate(["/connexion"]);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Terminé', {
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
