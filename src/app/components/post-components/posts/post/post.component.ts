import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from '../../../../services/post-service/posts.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../models/post.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from '../../../../services/user-service/user.service';
import { forkJoin } from 'rxjs';
import { User } from '../../../../models/user.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JumbotronComponent } from '../../../jumbotron/jumbotron/jumbotron.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule ,JumbotronComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  posts$: Post[] = [];
  users$: User[] = [];
  page: number = 1;
  line: number = 20;
  userName: string = '';
  filter: string = '';
  isAdmin: boolean = false;
  currentPostCount: number = 0;
  currentUserCount: number = 0;

  ngOnInit(): void {
    sessionStorage.getItem('isAdmin') === 'true'
      ? (this.isAdmin = true)
      : (this.isAdmin = false);
    this.getPostsAndUserDetails();
  }

  getPostsAndUserDetails = () => {
    return forkJoin({
      posts: this.postService.getPosts(),
      users: this.userService.getUsers(),
    }).subscribe((response) => {
      this.postService.getJumbotronInfos().subscribe((infos) => {
        this.currentPostCount = infos.title;
        this.currentUserCount = infos.subtitle;
      })
      this.posts$ = response.posts;
      this.users$ = response.users;
      let newNumberOfPosts = this.posts$.length - this.currentPostCount;
      this.posts$.splice(0, newNumberOfPosts);
      for (let i = 0; i < this.posts$.length; i++) {
        for (let j = 0; j < this.users$.length; j++) {
          if (this.posts$[i].userId === this.users$[j].id) {
            this.posts$[i].userName = this.users$[j].name;
          }
        }
      }
    });
  };

  get filteredPosts(): Post[] {
    if (!this.filter) {
      return this.posts$;
    }
    const lowerCaseFilter = this.filter.toLowerCase();

    return this.posts$.filter((post) => {
      return (
        post.title.toLowerCase().includes(lowerCaseFilter) ||
        post.userName.toLowerCase().includes(lowerCaseFilter) ||
        post.body.toLowerCase().includes(lowerCaseFilter)
      );
    });
  }

  navigateToList = () => {
    this.router.navigate(['welcome']);
  };
  deletePost = (id: any) => {
    let index = this.posts$.findIndex((post) => post.id === id);
    this.posts$.splice(index, 1);
    this.postService.setJumbotronInfos(this.posts$.length, this.users$.length);
  };

  navigateToSinglePost = (id: number,userId:number) => {
    this.router.navigate(['/post',id, 'autore', userId]);
  };
}
