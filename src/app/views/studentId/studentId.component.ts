import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component ({
  selector: 'app-views-studentId',
  templateUrl: './studentId.component.html',
  styleUrls: ['./studentId.component.css']
})

export class studentIdComponent implements OnInit, OnDestroy{
  url = 'http://www.igdir.edu.tr/Addons/Resmi/Images/User-Profile/profil-19.png';
  public user: User;
  submitted: boolean;
  uploadedImg: boolean = false;
  public campus: String;
  public studentYear: String;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.uploadedImg = false;
    this.user = this.authService.getCurrentUser();
  }


  onSend(form: NgForm) {

    if (form.invalid) {
      this.submitted = true;
      return;
    }

    //this.authService.setUserImage(this.url);

    this.user.img = this.url;
    this.user.userId = form.value.id;
    this.user.phoneNumber = form.value.phoneNumber;

    var yearValue = (<HTMLSelectElement>document.getElementById('year'));
    this.studentYear = yearValue.options[yearValue.selectedIndex].text;

    var campusValue = (<HTMLSelectElement>document.getElementById('campus'));
    this.campus = campusValue.options[campusValue.selectedIndex].text;

    if (this.uploadedImg) {
      this.authService.updateUserDetails(this.user);
      this.router.navigate(['/']);
      this.submitted = false;
    }



  }

  onImgUpload(event) {

    if (event.target.files && event.target.files[0]) {
      var reader: any = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.uploadedImg = true;
      }
    }
    else {
      this.uploadedImg = false;
    }
  }

  ngOnDestroy() {

  }
}
