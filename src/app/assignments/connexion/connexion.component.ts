import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  hide = true;
  nomUtilisateur: string;
  motDePasse: string;

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const user = new User();
    user.name = this.nomUtilisateur;
    user.password = this.motDePasse;
    console.log(user)
    this.userService.login(user).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/home"]).then(r => {
        window.location.reload();
        console.log(r)
      });
    });
  }

  onClickRegister(){
    this.router.navigate(["/register"]).then(r => console.log(r));
  }
}
