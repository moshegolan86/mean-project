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
import { viewContentComponent } from './views/viewContent/viewContent.component';
import { aboutComponent } from './views/about/about.component';
import { tutorsComponent } from './views/tutors/tutors.component';
import { infoComponent } from './views/info/info.component';
import { reservesComponent } from './views/reserves/reserves.component';
import { scholarshipComponent } from './views/scholarship/scholarship.component';
import { examsBankComponent } from './views/examsBank/examsBank.component';
import { AuthService } from './auth/auth.service';
import { eventComponent } from './views/event/event.component';

const routes: Routes = [
  { path: '', component: homeComponent},
  { path: 'register', component: registerComponent},
  { path: 'login', component: loginComponent},
  { path: 'userprofile', component: profileComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
  { path: 'contactUs', component: contactComponent},
  { path: 'admin', component: adminComponent },
  { path: 'studentIdRequest', component: studentIdComponent, canActivate: [AuthGuard], data: {roles: ['user']} },
  { path: 'about', component: aboutComponent},
  { path: 'viewContent/:postId', component: viewContentComponent},
  { path: 'tutors', component: tutorsComponent},
  { path: 'info' , component: infoComponent},
  { path: 'reserves', component: reservesComponent},
  { path: 'scholarship', component: scholarshipComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
  { path: 'examsBank', component: examsBankComponent, canActivate: [AuthGuard], data: {roles: ['user']}},
  { path: 'editpost/:postId', component: PostCreateComponent,  canActivate: [AuthGuard], data: {roles: ['user']}},
  { path: 'event/:eventId', component: eventComponent, canActivate: [AuthGuard], data: {roles: ['user']} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
