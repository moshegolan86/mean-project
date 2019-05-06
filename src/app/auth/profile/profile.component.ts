import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { User } from '../user.model';


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
isLogged: boolean;

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

    if (confirm("האם לשמור את השינויים?")) {
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

  }

  onCancel(form: NgForm) {

    if (confirm("לבטל את השינויים?")) {
      form.resetForm({
        firstName: this.authService.getCurrentUser().firstName,
        lastName: this.authService.getCurrentUser().lastName,
        phoneNumber: this.authService.getCurrentUser().phoneNumber,
        userId: this.authService.getCurrentUser().userId,
        email: this.authService.getCurrentUser().email
      });
    }
  }

  onPasswordChange(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.authService.getCurrentUser().password !== form.value.oldPassword) {
      this.isLogged = false;
    }
    else {
      if (this.authService.getIsAuth()) {
        this.isLogged = true;
        if (form.value.newPassword === form.value.retypePassword) {
          this.passNotEqual = false;
          this.authService.updatePassword(form.value.newPassword);

        }
        else {
          this.passNotEqual = true;
        }
      }
    }
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
