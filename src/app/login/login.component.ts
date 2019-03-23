import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';

import { iUserSecurity } from '../../app/interfases/i-user-security';


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
    if (this.cookieService.check('Imgur_token')) { // this.appService.accessToken
      this.appService.accessToken = this.cookieService.get('Imgur_token');
      console.log('User has already logged in, no need to validate, redirect to /welcome');
      this.router.navigate(['/welcome']);
    }
  }

  onLogin(): void {
    // This validation has been moved to OnInit method
    if (this.cookieService.check('Imgur_token')) { // this.appService.accessToken
      this.appService.accessToken = this.cookieService.get('Imgur_token');
      console.log('User has already logged in, no need to validate, redirect to /welcome');
      this.router.navigate(['/welcome']);
      return;
    }

    if (!this.appService.accessToken && !this.appService.refreshToken) {
      console.log('This is the first login, redirect to Imgur portal for account validation.');
      return;
    }
    if (!this.appService.accessToken && this.appService.refreshToken) {
      console.log('Need to get access token.');
      this.appService.generateAccessTokenPOST().subscribe(
         data => {
           const responseInfo: iUserSecurity = JSON.parse(data);
           this.appService.accessToken = responseInfo.access_token;
           this.appService.refreshToken = responseInfo.refresh_token;
           this.appService.accountId = responseInfo.account_id;
           this.appService.accountUserName = responseInfo.account_username;
           this.cookieService.set('Imgur_token', responseInfo.access_token);
           console.log('Got token for user: ', responseInfo.account_username);
      },
      err => console.error(err),
      () => console.log('onLogin() succseded, redirect to: ', this.appService.redirectUrl)
      );
      if (this.appService.redirectUrl) {
        this.router.navigateByUrl(this.appService.redirectUrl);
      } else {
      this.router.navigate(['/welcome']);
      }
      return;
    }
    console.error('Unknown error has been occured.');
  }

}
