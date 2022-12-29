import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "./shared/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments) - Pierre BIHANNIC - Ilaria AKOUETE ';
  isLogin: boolean = false;
  isAdmin: boolean;
  userName: string;

  constructor(private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLogin = !!this.tokenService.getToken();

    if(this.isLogin){
      const user = this.tokenService.getUser();
      console.log(user);
      this.isAdmin = user.isAdmin;

      this.userName = user.name;
    }
  }

  onClickConnexion(){
    this.router.navigate(["/connexion"]).then(r => console.log(r));
  }

  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }
}
