import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
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

  onClickRegister(){
    this.router.navigate(["/register"]).then(r => console.log(r));
  }
}
