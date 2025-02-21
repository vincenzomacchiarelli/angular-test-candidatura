import { Component, ViewChild } from '@angular/core';
import { PostService } from '../../../../../services/post-service/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../../../../models/post.interface';
import { PostCardComponent } from '../../post-card-component/post-card/post-card.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from '../../../../../models/user.interface';
import { UserService } from '../../../../../services/user-service/user.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts-grid',
  standalone: true,
  imports: [PostCardComponent, CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './posts-grid.component.html',
  styleUrl: './posts-grid.component.css',
})
export class PostsGridComponent {

  @ViewChild('gridView') child: any;
  posts$: Post[] = [];
  users$: User[] = [];
  errorMsg: string = '';
  page: number = 1;
  line: number = 14;
  filter: string = '';


  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPostsAndUserDetails();
  }

  getPostsAndUserDetails = () => {
    return forkJoin({
      posts: this.postService.getPosts(),
      users: this.userService.getUsers(),
    }).subscribe((response) => {
      this.posts$ = response.posts;
      this.users$ = response.users;
      this.postService.setJumbotronInfos(response.posts.length, response.users.length);
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

  handleEdit = (articolo: Post) => {
    console.log('Cliccato tasto modifica del codice ' + articolo.id);
  };

  handleDelete = (articolo: Post) => {
    this.posts$.splice(
      this.posts$.findIndex((x) => x.id === articolo.id),
      1
    );
    this.postService.setJumbotronInfos(this.posts$.length, this.users$.length);
  };

  navigateBack = () => {
    this.router.navigate(['/post/list']);
  };
}
