import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../../../services/post-service/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../../../../models/post.interface';
import { User } from '../../../../../../models/user.interface';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../../../../services/user-service/user.service';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {

  postId: number = 0;
  userId: number = 0;
  post$!: Post;
  user$!: User;
  constructor(private postService:PostService,
    private userService:UserService,
     private route:ActivatedRoute ,
    private router:Router) {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    })
  }

  ngOnInit(): void {
   this.getSinglePostAndSingleUser();
  }

  getSinglePostAndSingleUser = () => {
    return forkJoin({
      post: this.postService.getPostById(this.postId),
      user: this.userService.getUserById(this.postId)
    }).subscribe(response => {
      this.post$ = response.post;
      this.user$ = response?.user;
    })
  }

  goBack = () => {
    this.router.navigate(['autore', this.user$.id]);
  }


}
