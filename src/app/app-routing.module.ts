import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { loginComponent } from './auth/login/login.component';
import { registerComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { profileComponent } from './auth/profile/profile.component';

const routes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'register', component: registerComponent},
  { path: 'login', component: loginComponent},
  { path: 'userprofile', component: profileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
