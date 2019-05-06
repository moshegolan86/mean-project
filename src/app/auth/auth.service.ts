import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { User } from "./user.model";
import { headerComponent } from '../header/header.component';

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private currentUser: User;
  private isAdmin = false;
  public redirectUrl: string;
  private hasImg = false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getHasImg() {
    return this.hasImg;
  }

  createUser(email: string, password: string, firstName: string, lastName: string, isAdmin: boolean, img: String, phoneNumber: String, userId: String) {
    const user: User = { email: email, password: password, firstName: firstName, lastName: lastName,
    img: null, isAdmin: isAdmin, phoneNumber: null, userId: null};
    this.http
      .post("http://localhost:3000/api/user/register", user)
      .subscribe(response => {
        console.log(response);
        if (!user.isAdmin) {
          this.login(user.email, password);
        }
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      });

  }

  login(email: string, password: string) {
    const user: User = { email: email, password: password, firstName: null, lastName: null, isAdmin: null, img: null, phoneNumber: null, userId: null};
    this.http
      .post<{ token: string; expiresIn: number, firstName: string, lastName: string, isAdmin: boolean, img: string, phoneNumber: String, userId: String }>(
        "http://localhost:3000/api/user/login",
        user
      )
      .subscribe(response => {
        user.firstName = response.firstName;
        user.lastName = response.lastName;
        user.isAdmin = response.isAdmin;
        user.img = response.img;
        user.userId = response.userId;
        user.phoneNumber = response.phoneNumber;
        if (user.isAdmin) {
          console.log("this user is admin " + user.firstName);
          this.isAdmin = true;
        }
        else {
          this.isAdmin = false;
        }
        if (user.img !== null) {
          this.hasImg = true;
        }
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.currentUser = user;
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }
          else {
            this.router.navigate(['/']);
          }



        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.hasImg = false;
    if (this.getIsAdmin()) {
      this.isAdmin = false;
    }
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  getCurrentUser(): User {
    if (this.getIsAuth()) {
      return this.currentUser;
    }
  }

  isExist() {
    if (this.currentUser) {
      console.log("this user is exist");
      return true;
    }
    return false;
  }

  setUserImage(url: string) {

    this.currentUser.img = url;
    this.http
    .post("http://localhost:3000/api/user/studentIdRequest", this.currentUser)
    .subscribe(response => {
      console.log("i'm in auth service in set user image " + response);
      //this.router.navigate(['/']);
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  updateUserDetails(user: User) {
    this.currentUser = user;
    this.http
    .post("http://localhost:3000/api/user/updateDetails", this.currentUser)
    .subscribe(response => {


    }, error => {
      this.authStatusListener.next(false);
    });
  }

  updatePassword(password: string) {
    this.currentUser.password = password;
    console.log("my password: " + this.currentUser.password);
    this.http.post("http://localhost:3000/api/user/updatePassword", this.currentUser)
    .subscribe(user => {
      console.log("after call: " + user);
      this.login(this.currentUser.email, this.currentUser.password);
    }, error => {
      this.authStatusListener.next(false);
    });
  }



}
