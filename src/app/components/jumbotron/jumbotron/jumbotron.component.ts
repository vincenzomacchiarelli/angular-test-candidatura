import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post-service/posts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.css'
})
export class JumbotronComponent implements OnInit , AfterViewChecked {
  title: number = 0;
  subtitle: number = 0;
  Show: boolean = true;

  isLogin: boolean = false;

  constructor(private route: ActivatedRoute , private postService:PostService , private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
     sessionStorage.getItem('isAdmin') == 'true' ? this.isLogin = true : this.isLogin = false;
  }

  ngAfterViewChecked(): void {
    this.postService.getJumbotronInfos().subscribe((data) => {
      this.title = data.title;
      this.subtitle = data.subtitle;
    });
    this.cdr.detectChanges();
  }
}
