import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homeComponent } from './views/home/home.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { loginComponent } from './auth/login/login.component';
import { registerComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { profileComponent } from './auth/profile/profile.component';
import { contactComponent } from './views/contact/contact.component';
import { adminComponent } from './auth/admin/admin.component';
import { studentIdComponent } from './views/studentId/studentId.component';

const routes: Routes = [
  { path: '', component: homeComponent},
  { path: 'register', component: registerComponent},
  { path: 'login', component: loginComponent},
  { path: 'userprofile', component: profileComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
  { path: 'contactUs', component: contactComponent},
  { path: 'admin', component: adminComponent },
  { path: 'studentIdRequest', component: studentIdComponent, canActivate: [AuthGuard], data: {roles: ['user']} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
