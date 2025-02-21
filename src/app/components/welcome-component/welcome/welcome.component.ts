import { Component } from '@angular/core';
import { PostComponent } from "../../post-components/posts/post/post.component";
import { PostsGridComponent } from '../../post-components/posts/posts-grid-component/posts-grid/posts-grid.component';
import { JumbotronComponent } from '../../jumbotron/jumbotron/jumbotron.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [PostsGridComponent,JumbotronComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})

export class WelcomeComponent {

}
