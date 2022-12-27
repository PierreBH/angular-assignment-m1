import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../model/assignment.model';
import {Matiere} from "../model/matiere.model";
import {Eleve} from "../model/eleve.model";
import {MatiereService} from "../../shared/matiere.service";
import {EleveService} from "../../shared/eleve.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomDevoir:string;
  dateDeRendu:Date;
  matiere: Matiere;
  auteur: Eleve;
  listMatiere: Matiere[] = [];
  listEleve: Eleve[] = [];
  note: number | null;
  remarque: string | null;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.initListEleve();
    this.initListMatiere();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      console.log(assignment)
      // Pour pré-remplir le formulaire
      this.nomDevoir = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.auteur = assignment.auteur;
      this.matiere = assignment.matiere;
      this.note = assignment.note;
      this.remarque = assignment.remarque;
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomDevoir;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }

  initListMatiere() {
    this.matiereService.getAllMatiere().subscribe(data => this.listMatiere = data);
  }

  initListEleve(){
    this.eleveService.getAllEleve().subscribe(data => this.listEleve = data);
  }
}
