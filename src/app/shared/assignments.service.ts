import { Injectable } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {Assignment} from "../assignments/model/assignment.model";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import {bdInitialAssignments} from "./data";
import {MatSnackBar } from "@angular/material/snack-bar";
import {Matiere} from "../assignments/model/matiere.model";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  uri = 'http://localhost:8010/api/assignments';

  constructor(private loggingService: LoggingService, private _snackBar: MatSnackBar, private http: HttpClient) { }

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page: number, limit: number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri + `?page=${page}&limit=${limit}`);
  }

  getAssignment(id: string): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(`${this.uri}/${id}`);
  }

  addAssignment(assignment: Assignment) : Observable<any> {
    let message = this.http.post<Assignment>(this.uri, assignment);
    this.openSnackBar("Assignment ajouté !");
    return message;
  }

  updateAssignment(assignment: Assignment) : Observable<any> {
    this.openSnackBar("Assignment modifié !");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment) : Observable<any> {
    this.openSnackBar("Assignment supprimé !");
    return this.http.delete<Assignment>(`${this.uri}/${assignment._id}`);
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:Assignment = new Assignment();

      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarque = a.remarque;
      nouvelAssignment.eleve = a.eleve;
      nouvelAssignment.matiere = a.matiere;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Terminé', {
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
