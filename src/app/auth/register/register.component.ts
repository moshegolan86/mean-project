import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class registerComponent implements OnInit, OnDestroy {
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

  onRegister(form: NgForm) {
    if (form.invalid) {
      this.submitted = true;
      return;
    }

    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.firstName,
      form.value.lastName, form.value.isAdmin, null, null, null);
    this.isInvalidInput = false;
    this.submitted = false;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
