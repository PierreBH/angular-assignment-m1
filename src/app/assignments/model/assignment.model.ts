import {Matiere} from "./matiere.model";

export class Assignment {
  _id: string;
  id!: number;
  auteur!:string;
  nom!: string;
  matiere!: Matiere;
  note!:number;
  remarque!:string;
  dateDeRendu!: Date;
  rendu !: boolean;
}
