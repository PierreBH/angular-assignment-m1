import {Component, OnInit} from '@angular/core';
import {Assignment} from "../model/assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {FormBuilder, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatiereService} from "../../shared/matiere.service";
import {Matiere} from "../model/matiere.model";
import {Eleve} from "../model/eleve.model";
import {EleveService} from "../../shared/eleve.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir = "";
  dateDeRendu:Date;
  matiere: Matiere;
  auteur: Eleve;
  listMatiere: Matiere[] = [];
  listEleve: Eleve[] = [];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private assignmentService: AssignmentsService, private router: Router, private _formBuilder: FormBuilder, private matiereService: MatiereService,private eleveService: EleveService) { }

  ngOnInit(): void {
    this.initListMatiere();
    this.initListEleve();
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.eleve = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.note = null;
    newAssignment.remarque = null;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    this.assignmentService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"]);
    });
  }

  initListMatiere() {
    this.matiereService.getAllMatiere().subscribe(data => this.listMatiere = data);
  }

  initListEleve(){
    this.eleveService.getAllEleve().subscribe(data => {
      this.listEleve = data
      if(data.length > 0){
        this.auteur = data[0];
      }
    });
  }

}
