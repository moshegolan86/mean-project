import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component ({
  selector: 'app-views-studentId',
  templateUrl: './studentId.component.html',
  styleUrls: ['./studentId.component.css']
})

export class studentIdComponent implements OnInit, OnDestroy{
  url = '';
  public user: User;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();

  }


  onSend(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.setUserImage(this.user.firstName, this.user.lastName, this.user.email, this.user.password, this.url, this.user.isAdmin );

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
