import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';

import { UserSecurity } from '../Data Model/user-security';
import { GeneralResponse } from '../Data Model/general-response';
import { Avatar } from '../interfases/avatar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              protected appService: AppService,
              private cookieService: CookieService) { }

  getRefreshTokenURL = 'https://api.imgur.com/oauth2/authorize?client_id=068110f0021f5da&response_type=token&state=APPLICATION_STATE';
  cookieValue = 'UNKNOWN';

  ngOnInit() {
    // if (this.cookieService.check('Imgur_token')) { // this.appService.accessToken
    //   this.appService.accessToken = this.cookieService.get('Imgur_token');
    //   console.log('User has already logged in, no need to validate, redirect to /welcome');
    //   this.router.navigate(['/welcome']);
    //   this.appService.isLoggedIn = true;
    // }
  }

  onLogin(): void {
    // This validation has been moved to OnInit method
    if (this.cookieService.check('Imgur_token')) { // this.appService.accessToken
      // this.appService.userSecurity.access_token = this.cookieService.get('Imgur_token');
      // this.appService.userSecurity.account_username = this.cookieService.get('Imgur_username');
      // this.appService.userSecurity.account_id = this.cookieService.get('Imgur_user_Id');
      this.appService.getCookie();
      console.log('User has already logged in, no need to validate, redirect to /welcome');
      this.router.navigate(['/welcome']);
      this.appService.isLoggedIn = true;
      return;
    }

    if (!this.appService.userSecurity.access_token && !this.appService.refreshToken) {
      console.log('This is the first login, redirect to Imgur portal for account validation.');
      return;
    }
    if (!this.appService.userSecurity.access_token && this.appService.refreshToken) {
      console.log('Need to get access token.');
      this.appService.generateAccessTokenPOST().subscribe(
         data => {
           this.populateUserData(JSON.parse(data));
      },
      err => {
        console.error(err);
        return;
      },
      () => {console.log('onLogin() succseded, redirect to: ', this.appService.redirectUrl);
             if (this.appService.redirectUrl) {
              console.log('Redirection after login to: ', this.appService.redirectUrl );
              this.router.navigate([this.appService.redirectUrl]);
            } else {
              this.router.navigate(['/welcome']);
            }
          }
      );
      return;
    }
    console.error('Unknown error has been occured.');
  }

  populateUserData(user: UserSecurity): void {
    this.appService.userSecurity.access_token = user.access_token;
    this.appService.userSecurity.refresh_token = user.refresh_token;
    this.appService.userSecurity.account_id = user.account_id;
    this.appService.userSecurity.account_username = user.account_username;
    this.appService.accountUserName = user.account_username;
    console.log('populateUserData()');
    this.appService.setCookies();
    // this.cookieService.set('Imgur_token', user.access_token);
    // this.cookieService.set('Imgur_username', user.account_username);
    // this.cookieService.set('Imgur_user_Id', user.account_id);
    // console.log('Got token for user: ', user.account_username);
    this.appService.isLoggedIn = true;
    // this.appService.getAccountAvatar(user.account_username).subscribe(
    //   data => {
    //     const avatar: GeneralResponse<Avatar> = JSON.parse(data);
    //   }
    // );
  }
}
