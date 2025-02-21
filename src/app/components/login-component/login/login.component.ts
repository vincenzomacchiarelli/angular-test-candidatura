import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login-service/login.service';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  form: any;
  errMsg: string = '';

  constructor(private loginService:LoginService) {
    this.form = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
   }

  ngOnInit() {
  }

  login = () => {
    if ((this.userName !== 'user' || this.password === 'user') && (this.userName !== 'admin' || this.password === 'admin')) {
      this.errMsg = 'Inserire delle credenziali valide';
    }
    this.loginService.login({username: this.userName, password: this.password, isAdmin: false , isLoggedIn: false});
  }

}
