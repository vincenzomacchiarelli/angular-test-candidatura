import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome-component/welcome/welcome.component';
import { PostsGridComponent } from './components/post-components/posts/posts-grid-component/posts-grid/posts-grid.component';
import { SinglePostComponent } from './components/post-components/posts/post/single-post-component/single-post/single-post.component';
import { PostComponent } from './components/post-components/posts/post/post.component';
import { UserInfoComponent } from './components/user-component/user-info/user-info.component';

export const routes: Routes = [

  {
    path:'welcome',
    component: WelcomeComponent
  },

  {
    path:'post/list',
    component: PostComponent
  },
  {
    path: 'post/:id/autore/:id',
    component: SinglePostComponent
  },
  {
    path: 'autore/:id',
    component: UserInfoComponent
  },

];
