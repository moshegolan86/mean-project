import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component ({
  selector: 'app-auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class profileComponent implements OnInit, OnDestroy {

constructor (public authService: AuthService) {}


  ngOnInit() {

  }

  ngOnDestroy() {

  }

  // changeListener($event, index: number): void {
  //   this.readThis($event.target, index);
  // }


  // readThis(inputValue: any, index: number): void {
  //   var file:File = inputValue.files[0];
  //   var myReader:FileReader = new FileReader();

  //   myReader.onloadend = (e) => {
  //       this.authService.getCurrentUser().img = myReader.result.toString();
  //   }
  //   myReader.readAsDataURL(file);
  // }
}
