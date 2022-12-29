import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {User} from "../model/user.model";

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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  selectRole(event: string) {
    this.role = event;
  }

  onClickConnexion(){
    this.router.navigate(["/connexion"]).then(r => console.log(r));
  }

  register() {
    const user = new User();
    user.name = this.nomUtilisateur;
    user.password = this.motDePasse;
    user.isAdmin = this.role === "admin";
    this.userService.register(user).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/home"]).then(r => console.log(r));
    });
  }

}
