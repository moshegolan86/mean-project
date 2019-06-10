import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatToolbarModule,
         MatExpansionModule,
         MatProgressSpinnerModule,
         MatDatepickerModule,
         MatNativeDateModule
       } from '@angular/material';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { headerComponent } from './header/header.component';
import { homeComponent } from './views/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { loginComponent } from './auth/login/login.component';
import { registerComponent } from './auth/register/register.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { profileComponent } from './auth/profile/profile.component';
import { contactComponent } from './views/contact/contact.component';
import { adminComponent } from './auth/admin/admin.component';
import { studentIdComponent } from './views/studentId/studentId.component';
import { footerComponent } from './footer/footer.component';
import { viewContentComponent } from './views/viewContent/viewContent.component';
import { aboutComponent } from './views/about/about.component';
import { tutorsComponent } from './views/tutors/tutors.component';
import { examsBankComponent } from './views/examsBank/examsBank.component';
import { infoComponent } from './views/info/info.component';
import { reservesComponent } from './views/reserves/reserves.component';
import { scholarshipComponent } from './views/scholarship/scholarship.component';
import { eventComponent } from './views/event/event.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    headerComponent,
    footerComponent,
    homeComponent,
    loginComponent,
    registerComponent,
    profileComponent,
    contactComponent,
    adminComponent,
    studentIdComponent,
    viewContentComponent,
    aboutComponent,
    tutorsComponent,
    examsBankComponent,
    infoComponent,
    reservesComponent,
    scholarshipComponent,
    eventComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],

})
export class AppModule { }

export class AppBootstrapModule { }
