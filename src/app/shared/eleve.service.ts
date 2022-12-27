import { Injectable } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {Assignment} from "../assignments/model/assignment.model";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import {bdInitialAssignments} from "./data";
import {MatSnackBar } from "@angular/material/snack-bar";
import {Eleve} from "../assignments/model/eleve.model";

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  uri = 'http://localhost:8010/api/eleve';

  constructor(private loggingService: LoggingService, private _snackBar: MatSnackBar, private http: HttpClient) { }

  getAllEleve():Observable<Eleve[]> {
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(`${this.uri}/${id}`);
  }

  addAssignment(assignment: Assignment) : Observable<any> {
    let message = this.http.post<Assignment>(this.uri, assignment);
    return message;
  }

  updateAssignment(assignment: Assignment) : Observable<any> {
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment) : Observable<any> {
    return this.http.delete<Assignment>(`${this.uri}/${assignment._id}`);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
