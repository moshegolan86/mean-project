import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from 'rxjs';
//import { headerComponent } from 'src/app/header/header.component';

@Component ({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit, OnDestroy{

  isLoading = false;
  isInvalidInput = false;
  submitted = false;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) {}



  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
        this.isInvalidInput = true;
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.submitted = true;
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
    this.isInvalidInput = false;
    this.submitted = false;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}



