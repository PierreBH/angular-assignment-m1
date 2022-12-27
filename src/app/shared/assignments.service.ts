import { Injectable } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {Assignment} from "../assignments/model/assignment.model";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import {bdInitialAssignments} from "./data";
import {MatSnackBar } from "@angular/material/snack-bar";

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
    //return of(this.assignments.find(assignment => assignment.id === id));
    return this.http.get<Assignment>(`${this.uri}/${id}`);
  }

  addAssignment(assignment: Assignment) : Observable<any> {
    //this.assignments.push(assignment);
    //this.loggingService.log(assignment.nom, 'ajouté');
    //return of('Assignment ajouté');
    let message = this.http.post<Assignment>(this.uri, assignment);
    return message;
  }

  updateAssignment(assignment: Assignment) : Observable<any> {
    //const index = this.assignments.findIndex(a => a.nom === assignment.nom);
    //this.assignments[index] = assignment;
    //return of('Assignment Service : Assignment modifié !');
    this.openSnackBar("Assignment modifié !");
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment) : Observable<any> {
    //const index = this.assignments.findIndex(a => a.nom === assignment.nom);
    //this.assignments.splice(index, 1);
    //return of('Assignment Service : Assignment supprimé !');
    return this.http.delete<Assignment>(`${this.uri}/${assignment._id}`);
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

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
