import {Injectable} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {Assignment} from "../assignments/model/assignment.model";
import {LoggingService} from "./logging.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {bdInitialAssignments} from "./data";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../assignments/model/user.model";
import {TokenStorageService} from "./token.service";
import {withDebugTracing} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:8010/api/user';

  constructor(private loggingService: LoggingService, private _snackBar: MatSnackBar, private http: HttpClient, private tokenService: TokenStorageService) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.uri);
  }

  deleteUser(id: string) : Observable<any> {
    this.openSnackBar("Utilisateur supprimé !");
    return this.http.delete(this.uri + '/' + id);
  }

  updateUser(user: User) : Observable<any> {
    this.openSnackBar("Utilisateur modifié !");
    return this.http.put<User>(this.uri, user);
  }

  login(user: User) : Observable<any> {
    const loginObservable = this.http.post<User>(this.uri + '/login', user, httpOptions);
    loginObservable.subscribe((data: any) => {
      console.log(data);
      this.openSnackBar("Connexion réussie");
      this.tokenService.saveToken(data.token);
      this.tokenService.saveUser(data.user);
    },(err:HttpErrorResponse) => {
      if(err.status.toString().includes("401")){
        this.openSnackBar("Nom d'utilisateur ou mot de passe incorrect");
      }
    });
    return loginObservable;
  }

  register(user: User) : Observable<any> {
    return this.http.post<User>(this.uri + '/register', user, httpOptions);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Terminé', {
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
