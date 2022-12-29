import {User} from "../assignments/model/user.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() : void {
    window.sessionStorage.clear();
  }

  saveToken(token: string) : void {
    window.sessionStorage.removeItem("auth-token");
    window.sessionStorage.setItem("auth-token", token);
    console.log("token saved");
  }

  getToken() : string {
    return sessionStorage.getItem("auth-token") || "";
  }

  saveUser(user: User) : void {
    window.sessionStorage.removeItem("auth-user");
    window.sessionStorage.setItem("auth-user", JSON.stringify(user));
  }

  getUser() : User {
    return JSON.parse(sessionStorage.getItem("auth-user") || "{}");
  }
}
