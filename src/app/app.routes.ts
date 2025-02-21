import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome-component/welcome/welcome.component';
import { PostsGridComponent } from './components/post-components/posts/posts-grid-component/posts-grid/posts-grid.component';
import { SinglePostComponent } from './components/post-components/posts/post/single-post-component/single-post/single-post.component';
import { PostComponent } from './components/post-components/posts/post/post.component';
import { UserInfoComponent } from './components/user-component/user-info/user-info.component';
import { LoginComponent } from './components/login-component/login/login.component';
import { AuthInterceptor } from './security/interceptors/auth-interceptor';

export const routes: Routes = [

  {
    path:'',
    redirectTo:'welcome',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'welcome',
    canActivateChild: [AuthInterceptor],
    component: WelcomeComponent
  },

  {
    path:'post/list',
    canActivateChild: [AuthInterceptor],
    component: PostComponent
  },
  {
    path: 'post/:id/autore/:id',
    canActivateChild: [AuthInterceptor],
    component: SinglePostComponent
  },
  {
    path: 'autore/:id',
    canActivateChild: [AuthInterceptor],
    component: UserInfoComponent
  },

];
