import {AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {Assignment} from "../assignments/model/assignment.model";
import {Matiere} from "../assignments/model/matiere.model";
import {Eleve} from "../assignments/model/eleve.model";
import {AssignmentsService} from "../shared/assignments.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatiereService} from "../shared/matiere.service";
import {EleveService} from "../shared/eleve.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../assignments/model/user.model";
import {UserService} from "../shared/user.service";

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
  name: 'userFilter'
})
export class UserFilter implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!filter) return items;
    return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
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

type editUser = {
  id: string,
  isClicked: boolean,
}

@Component({
  selector: 'app-parameters-assignment',
  templateUrl: './parameters-assignment.component.html',
  styleUrls: ['./parameters-assignment.component.css']
})

export class ParametersAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  user!: User;
  nomDevoir:string;
  dateDeRendu:Date;
  matiereForm: Matiere;
  auteur: Eleve;
  listMatiere: Matiere[] = [];
  listEleve: Eleve[] = [];
  listUser: User[] = [];
  note: number | null;
  remarque: string | null;

  formControlEleve: FormControl;
  nomEleve: string;

  nomMatiere: string;
  urlImageMatiere: string;
  nomEnseignant: string;
  urlImageEnseignant: string;

  editUser: editUser[] = [];
  role: string;

  constructor(
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService,
    private eleveService: EleveService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initListEleve();
    this.initListMatiere();
    this.initListUser();
    this.formControlEleve = this._formBuilder.control('', [Validators.required]);
  }

  onSaveUser(userToSave: User) {
    if (!userToSave) return;
    userToSave.isAdmin = this.role === 'admin';
    this.userService
      .updateUser(userToSave)
      .subscribe((message) => {
        console.log(message);
        this.editUser[this.editUser.findIndex(user => user.id === userToSave._id)].isClicked = false;
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

  initListUser(){
    this.userService.getAllUser().subscribe(data => {
      this.listUser = data
      this.editUser = data.map(user => {
        return {
          id: user._id,
          isClicked: false
        }
      });
    });
  }

  addEleve(){
    if(this.nomEleve.length > 0) {
      this.eleveService.addEleve(this.nomEleve).subscribe(data => this.initListEleve());
    }
  }

  deleteEleve(eleve: Eleve) {
    this.eleveService.deleteEleve(eleve).subscribe(data => this.initListEleve());
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user._id).subscribe(data => this.initListUser());
  }

  clickEdit(user: User) {
    this.editUser = this.editUser.map(editUser => {
      if(editUser.id === user._id) {
        editUser.isClicked = true;
      }
      return editUser;
    });
    this.role = user.isAdmin ? 'admin' : 'user';
  }

  isEditingUser(user: User) {
    return this.editUser.find(editUser => editUser.id === user._id)?.isClicked;
  }

  isOneIsEditing() {
    return this.editUser.some(editUser => editUser.isClicked);
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
