import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
//import { User } from '../auth/user.model';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class headerComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  isUserAdmin = false;
  private authListenerSubs: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    console.log("in on init - header");
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      console.log("header: in on init - afetr subscription");
      this.isUserAdmin = this.authService.getIsAdmin();

    });
  }

  onAdminLogin() {
    this.isUserAdmin = true;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
