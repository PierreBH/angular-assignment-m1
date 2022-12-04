import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../connexion/connexion.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  nomUtilisateur: string;
  motDePasse: string;
  role: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  selectRole(event: string) {
    this.role = event;
  }

  authentification(){
    this.authService.logIn();
  }

  onClickConnexion(){
    this.router.navigate(["/connexion"]).then(r => console.log(r));
  }

}
