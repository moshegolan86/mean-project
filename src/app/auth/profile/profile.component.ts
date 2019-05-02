import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { User } from '../user.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component ({
  selector: 'app-auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class profileComponent implements OnInit, OnDestroy {
url = '';
public user: User;
submitted: boolean = false;
passNotEqual: boolean = false;

constructor (public authService: AuthService) {}


  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (this.authService.getCurrentUser().img != null) {
      this.url = this.authService.getCurrentUser().img.toString();
    }
    else {
      this.url = "http://www.igdir.edu.tr/Addons/Resmi/Images/User-Profile/profil-19.png"
    }

  }

  onSaveChanges(form: NgForm) {
    if (form.invalid) {
      this.submitted = true;
      return;
    }

    if (form.value.password !== form.value.retypePassword) {
      this.passNotEqual = true;
      return;
    }
    else {
      this.passNotEqual = false;
    }
    this.user = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
      img: this.url,
      phoneNumber: form.value.phoneNumber,
      userId: form.value.userId,
      isAdmin: this.authService.getCurrentUser().isAdmin
    };

    this.authService.updateUserDetails(this.user);
    this.submitted = false;

  }

  onCancel() {
    this.user = this.authService.getCurrentUser();
  }

  onImgUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader: any = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  ngOnDestroy() {

  }
}
