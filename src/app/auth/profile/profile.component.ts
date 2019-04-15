import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component ({
  selector: 'app-auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class profileComponent implements OnInit,OnDestroy{




  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
