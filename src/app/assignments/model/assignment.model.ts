import {Matiere} from "./matiere.model";
import {Eleve} from "./eleve.model";

export class Assignment {
  _id: string;
  eleve!:Eleve;
  nom!: string;
  matiere!: Matiere;
  note!:number | null;
  remarque!:string | null;
  dateDeRendu!: Date;
  rendu !: boolean;
}
