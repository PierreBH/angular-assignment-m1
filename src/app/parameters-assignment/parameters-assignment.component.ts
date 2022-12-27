import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Assignment} from "../assignments/model/assignment.model";
import {Matiere} from "../assignments/model/matiere.model";
import {Eleve} from "../assignments/model/eleve.model";
import {AssignmentsService} from "../shared/assignments.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatiereService} from "../shared/matiere.service";
import {EleveService} from "../shared/eleve.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Pipe({
  name: 'nameFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!filter) return items;
    return items.filter(item => item.nom.toLowerCase().includes(filter.toLowerCase()));
  }
}

@Pipe({
  name: 'matiereFilter'
})
export class MatiereFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!filter) return items;
    return items.filter(item => item.nomEnseignant.toLowerCase().includes(filter.toLowerCase()) || item.nom.toLowerCase().includes(filter.toLowerCase()));
  }
}

@Component({
  selector: 'app-parameters-assignment',
  templateUrl: './parameters-assignment.component.html',
  styleUrls: ['./parameters-assignment.component.css']
})
export class ParametersAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomDevoir:string;
  dateDeRendu:Date;
  matiereForm: Matiere;
  auteur: Eleve;
  listMatiere: Matiere[] = [];
  listEleve: Eleve[] = [];
  note: number | null;
  remarque: string | null;

  formControlEleve: FormControl;
  nomEleve: string;

  nomMatiere: string;
  urlImageMatiere: string;
  nomEnseignant: string;
  urlImageEnseignant: string;

  constructor(
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService,
    private eleveService: EleveService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.initListEleve();
    this.initListMatiere();
    this.formControlEleve = this._formBuilder.control('', [Validators.required]);
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
      this.auteur = this.listEleve.find(eleve => eleve._id === assignment.eleve._id) ?? assignment.eleve;
      this.matiereForm = this.listMatiere.find(matiere => matiere._id === assignment.matiere._id) ?? assignment.matiere;
      this.note = assignment.note;
      this.remarque = assignment.remarque;
    });
  }

  onSaveAssignment() {
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
      });
  }

  initListMatiere() {
    this.matiereService.getAllMatiere().subscribe(data => this.listMatiere = data);
  }

  initListEleve(){
    this.eleveService.getAllEleve().subscribe(data => this.listEleve = data);
  }

  addEleve(){
    if(this.nomEleve.length > 0) {
      this.eleveService.addEleve(this.nomEleve).subscribe(data => this.initListEleve());
    }
  }

  deleteEleve(eleve: Eleve) {
    this.eleveService.deleteEleve(eleve).subscribe(data => {
      this.initListEleve();
    });
  }

  addMatiere(){
    if(this.nomMatiere.length > 0) {
      const matiere = new Matiere();
      matiere.nom = this.nomMatiere;
      matiere.imgMatiere = this.urlImageMatiere;
      matiere.nomEnseignant = this.nomEnseignant;
      matiere.imgProf = this.urlImageEnseignant;
      this.matiereService.addMatiere(matiere).subscribe(data => this.initListMatiere());
    }
  }

  deleteMatiere(matiere: Matiere) {
    this.matiereService.deleteMatiere(matiere).subscribe(data => {
      this.initListMatiere();
    });
  }
}
