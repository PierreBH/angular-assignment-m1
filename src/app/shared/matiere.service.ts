import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar } from "@angular/material/snack-bar";
import {Matiere} from "../assignments/model/matiere.model";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri = 'https://apiassignments.onrender.com/api/matiere';

  constructor(private loggingService: LoggingService, private _snackBar: MatSnackBar, private http: HttpClient) { }

  getAllMatiere():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }

  getMatiereById(id: number): Observable<Matiere | undefined> {
    return this.http.get<Matiere>(`${this.uri}/${id}`);
  }

  addMatiere(matiere: Matiere) : Observable<any> {
    let message = this.http.post<Matiere>(this.uri, matiere);
    return message;
  }

  updateMatiere(matiere: Matiere) : Observable<any> {
    return this.http.put<Matiere>(this.uri, matiere);
  }

  deleteMatiere(matiere: Matiere) : Observable<any> {
    return this.http.delete<Matiere>(`${this.uri}/${matiere._id}`);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
