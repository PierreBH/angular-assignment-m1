import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignment} from "../assignments/model/assignment.model";
import {AssignmentsService} from "../shared/assignments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis: Assignment | null | undefined;
  panelOpenState: boolean = false;
  isChecked: boolean = false;

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAssignment()
  }

  onSubmit(){

  }

  getAssignment() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.assignmentsService.getAssignment(id)
        .subscribe(assignment => {
          this.assignmentTransmis = assignment;
          this.isChecked = assignment?.rendu ?? false;
          console.log(assignment)
        });
  }

  handleUpdateAssignment() {
    let assignment = this.assignmentTransmis ?? new Assignment();
    assignment.rendu = !this.assignmentTransmis?.rendu;
    this.assignmentsService.updateAssignment(assignment).subscribe(message => console.log(message));
    this.router.navigate(["/home"]).then(r => console.log(r));
  }

  handleDeleteAssignment() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis ?? new Assignment()).subscribe((message) => {
      console.log(message);
      this.router.navigate(["/home"]).then(r => console.log(r));
    });
  }

  onClickEdit(){
    this.router.navigate(["/assignment", this.assignmentTransmis?._id, 'edit'],
      {queryParams: {nom: this.assignmentTransmis?.nom}, fragment: 'edition'});
  }

  isAdmin(){
    return this.authService.loggedIn;
  }
}