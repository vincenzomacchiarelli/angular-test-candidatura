import { Injectable } from "@angular/core";
import { Login } from "../../models/login.interface";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router: Router) { }

  login(login: Login): boolean {
    if (login.username === 'admin' && login.password === 'admin') {
      login.isLoggedIn = true;
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('isLoggedIn', 'true');
      console.log(sessionStorage.getItem('isAdmin'));
      this.router.navigate(['/welcome']);
      return login.isAdmin === true;
    }else if (login.username === 'user' && login.password === 'user') {
      login.isLoggedIn = true;
      sessionStorage.setItem('isAdmin', 'false');
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/welcome']);
      return login.isAdmin === false;
    }else {
      login.isLoggedIn = false;
      sessionStorage.setItem('isLoggedIn', 'false');
      return false;
    }
  }
}
