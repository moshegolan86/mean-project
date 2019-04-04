import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { loginComponent } from './posts/login/login.component';

const routes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'register', component: PostCreateComponent},
  { path: 'login', component: loginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
