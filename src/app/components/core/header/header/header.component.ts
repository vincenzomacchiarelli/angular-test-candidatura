import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AvatarComponent } from "../avatar/avatar/avatar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarComponent ,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit ,AfterViewChecked {

  isLogged: boolean = false;
  userName: string | null = "";
  constructor(private router:Router , private cdr: ChangeDetectorRef) {
  }


  ngOnInit(): void {
   this.getIntialState();
  }

  ngAfterViewChecked() {
    this.getIntialState();
    this.cdr.detectChanges();
  }

  getIntialState = () => {
    sessionStorage.getItem('isLoggedIn') === 'true' ? this.isLogged = true : this.isLogged = false;
  }

  logout = () => {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('isAdmin', 'false');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  goToHome = () => {
    this.router.navigate(['/']);
  }

}
