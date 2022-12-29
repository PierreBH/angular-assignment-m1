import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../model/assignment.model';
import {Matiere} from "../model/matiere.model";
import {Eleve} from "../model/eleve.model";
import {MatiereService} from "../../shared/matiere.service";
import {EleveService} from "../../shared/eleve.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../shared/token.service";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomDevoir:string;
  dateDeRendu:Date;
  matiereForm: Matiere;
  auteur: Eleve;
  listMatiere: Matiere[] = [];
  listEleve: Eleve[] = [];
  note: number | null;
  remarque: string | null;

  formControlNote = this._formBuilder.control('', [Validators.required, Validators.min(0), Validators.max(20)]);
  formGroup:FormGroup;
  private isLoggedIn: boolean;
  private isAdmin: boolean;
  private userName: string;


  constructor(
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService,
    private eleveService: EleveService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    console.log(!!this.tokenService.getToken())

    if(this.isLoggedIn){
      const user = this.tokenService.getUser();
      this.isAdmin = user.isAdmin;

      this.userName = user.name;
    }

    this.auteur = new Eleve();
    this.matiereForm = new Matiere();

    this.getAssignment();
    this.initListEleve();
    this.initListMatiere();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = this.route.snapshot.params['id'];

    if(this.isLoggedIn){
      this.assignmentsService.getAssignment(id).subscribe((assignment) => {
        if (!assignment) return;
        this.assignment = assignment;
        console.log(assignment)
        // Pour pré-remplir le formulaire
        this.nomDevoir = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
        this.auteur._id = assignment.eleve._id;
        this.matiereForm._id = assignment.matiere._id;
        this.note = assignment.note;
        this.remarque = assignment.remarque;
      });
    } else {
      this.router.navigate(['/connexion']);
    }
  }

  onSaveAssignment() {
    if(this.isLoggedIn && this.isAdmin) {
      if (!this.assignment) return;

      // on récupère les valeurs dans le formulaire
      this.assignment.nom = this.nomDevoir;
      this.assignment.dateDeRendu = this.dateDeRendu;
      this.assignment.eleve = this.auteur;
      this.assignment.matiere = this.matiereForm;
      this.assignment.note = this.note;
      this.assignment.remarque = this.remarque;
      this.assignmentsService
        .updateAssignment(this.assignment)
        .subscribe((message) => {
          console.log(message);

          // navigation vers la home page
          this.router.navigate(['/home']);
        });
    }
  }

  initListMatiere() {
    this.matiereService.getAllMatiere().subscribe(data => {
      this.listMatiere = data
      console.log(data);
    });

  }

  initListEleve(){
    this.eleveService.getAllEleve().subscribe(data => this.listEleve = data);
  }
}
