import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit {
  postId: number = 0;
  userId: number = 0;
  user$!: User;
  constructor(
    private userService:UserService,
     private route:ActivatedRoute ,
    private router:Router) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    })
  }

  ngOnInit(): void {
   this.getSingleUser();
  }

  getSingleUser = () => {
     this.userService.getUserById(this.userId).subscribe(user => {
      this.user$ = user;
    });
  }

  goBack = () => {
    this.router.navigate(['welcome']);
  }
}
