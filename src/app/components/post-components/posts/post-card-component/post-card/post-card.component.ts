import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../../../../models/post.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input('item-card') item: Post = {
    id: 0,
    title: '',
    body: '',
    userId: 0,
    userName: ''
  };
  shortName: string = '';

  @Output('elimina-card') delete = new EventEmitter<Post>();

  imageList = [
    'https://picsum.photos/id/1011/800/450',
    'https://picsum.photos/id/103/800/450',
    'https://picsum.photos/id/1005/800/450',
  ];
  image: string = "";
  isAdmin: string = ""



  constructor(private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('isAdmin') === 'true') {
      this.isAdmin = 'true';
    }else {
      this.isAdmin = 'false';
    }
    this.sortDifferentImage();
    let splitName = this.item.userName.split(' ');
    this.shortName = splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0);
  }

  viewMore = () => {
    this.router.navigate(['/post', this.item.id, 'autore', this.item.userId]);
  }

  checkUserDetails = () => {
    this.router.navigate(['/autore', this.item.userId]);
  }

  deletePost = () => {
    this.delete.emit(this.item);
  }

  sortDifferentImage = () => {
    let randomIndex = Math.floor(Math.random() * this.imageList.length);
    this.image = this.imageList[randomIndex];
  }

}
