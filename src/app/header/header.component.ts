import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class headerComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  isUserAdmin = false;
  hasImg = false;
  private authListenerSubs: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      //console.log("header: in on init - afetr subscription");
      this.isUserAdmin = this.authService.getIsAdmin();
      this.hasImg = this.authService.getHasImg();
    });
  }

  onAdminLogin() {
    this.isUserAdmin = true;
  }

  onLogout() {
    this.hasImg = false;
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
