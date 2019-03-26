import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'ImgurAngular';
  constructor(private cookieService: CookieService,
              protected appService: AppService,
              private router: Router) {

  }
  ngOnInit() {
    if (this.cookieService.check('Imgur_token') && this.cookieService.check('Imgur_username')) { // this.appService.accessToken
      this.appService.userSecurity.access_token = this.cookieService.get('Imgur_token');
      this.appService.userSecurity.account_username = this.cookieService.get('Imgur_username');
      this.appService.userSecurity.account_id = this.cookieService.get('Imgur_user_Id');
      console.log('User has already logged in, no need to validate, redirect to /welcome');
      // this.router.navigate(['/welcome']);
      this.appService.isLoggedIn = true;
    }
  }
}
