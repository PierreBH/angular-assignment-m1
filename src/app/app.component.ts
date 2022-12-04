import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";
import {AssignmentsService} from "./shared/assignments.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments) - Pierre BIHANNIC  ';

  constructor(private authService: AuthService, private router: Router, private assignmentsService: AssignmentsService) { }

  login(){
    if(!this.authService.loggedIn){
      this.authService.logIn();
    } else{
      this.authService.logOut();
      this.router.navigate(["/home"]).then(r => console.log(r));
    }
  }

  onClickConnexion(){
    this.router.navigate(["/connexion"]).then(r => console.log(r));
  }
}
