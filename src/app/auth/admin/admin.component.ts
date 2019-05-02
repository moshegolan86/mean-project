import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-auth-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class adminComponent implements OnInit, OnDestroy {
  isLoading = false;
  isInvalidInput = false;
  submitted: boolean = false;
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

  onRegister(form: NgForm) {
    if (form.invalid) {
      this.submitted = true;
      return;
    }

    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.firstName,
      form.value.lastName, true, null, null, null);
    this.isInvalidInput = false;
    this.submitted = false;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  // setUserAdmin(isAdmin: boolean) {
  //   this.isUserAdmin = isAdmin;
  // }
}
