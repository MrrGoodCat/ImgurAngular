import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserSecurity } from './Data Model/user-security';
import { ApiService } from './api.service';
import { GeneralResponse } from './Data Model/general-response';
import { Avatar } from './interfases/avatar';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  userAvatar?: string;
  redirectUrl: string;
  isLoggedIn = false;

  cookieToken = 'Imgur_token';
  cookieAccountName = 'Imgur_username';
  cookieAccountId = 'Imgur_user_Id';

  userSecurity = new UserSecurity();

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  onLoggIn() {
    // This validation has been moved to OnInit method
    if (this.validateLoginFromCoockie()) {
      return;
    }

    if (
      !this.userSecurity.access_token &&
      !this.apiService.refreshToken
    ) {
      console.log(
        'This is the first login, redirect to Imgur portal for account validation.'
      );
      return;
    }
    if (
      !this.userSecurity.access_token &&
      this.apiService.refreshToken
    ) {
      console.log('Need to get access token.');
      this.apiService.generateAccessTokenPOST().subscribe(
        data => {
          this.populateUserData(JSON.parse(data));
        },
        err => {
          console.error(err);
          return;
        },
        () => {
          console.log(
            'onLogin() succseded, redirect to: ',
            this.redirectUrl
          );
          this.getAccountAvatarAuth(this.userSecurity.account_username);
          if (this.redirectUrl) {
            console.log(
              'Redirection after login to: ',
              this.redirectUrl
            );
            this.router.navigate([this.redirectUrl]);
          } else {
            this.router.navigate(['/welcome']);
          }
        }
      );
      return;
    }
    console.error('Unknown error has been occured.');
  }

  validateLoginFromCoockie(): boolean {
    if (this.checkCookies()) {
      this.getCookie();
      this.getAccountAvatarAuth(this.userSecurity.account_username);
      console.log(
        'User has already logged in, no need to validate, redirect to /welcome'
      );
      // this.router.navigate(['/welcome']);
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  onLogOut(): void {
    this.isLoggedIn = false;
    this.deleteCookie();
    this.userSecurity = new UserSecurity();
    this.router.navigate(['/login']);
  }

  setCookies() {
    this.cookieService.set(this.cookieToken, this.userSecurity.access_token);
    this.cookieService.set(
      this.cookieAccountName,
      this.userSecurity.account_username
    );
    this.cookieService.set(this.cookieAccountId, this.userSecurity.account_id);
  }

  getCookie(): boolean {
    if (
      this.cookieService.check(this.cookieToken) &&
      this.cookieService.check(this.cookieAccountName) &&
      this.cookieService.check(this.cookieAccountId)
    ) {
      this.userSecurity.access_token = this.cookieService.get(this.cookieToken);
      this.userSecurity.account_username = this.cookieService.get(
        this.cookieAccountName
      );
      this.userSecurity.account_id = this.cookieService.get(
        this.cookieAccountId
      );
      return true;
    }
    return false;
  }

  deleteCookie() {
    this.cookieService.delete(this.cookieToken);
    this.cookieService.delete(this.cookieAccountName);
    this.cookieService.delete(this.cookieAccountId);
  }

  checkCookies(): boolean {
    if (
      this.cookieService.check(this.cookieToken) &&
      this.cookieService.check(this.cookieAccountName) &&
      this.cookieService.check(this.cookieAccountId)
    ) {
      return true;
    }
    return false;
  }

  populateUserData(user: UserSecurity): void {
    this.userSecurity.access_token = user.access_token;
    this.userSecurity.refresh_token = user.refresh_token;
    this.userSecurity.account_id = user.account_id;
    this.userSecurity.account_username = user.account_username;
    // this.appService.accountUserName = user.account_username;
    console.log('populateUserData()');
    this.setCookies();
    this.isLoggedIn = true;
    // this.appService.getAccountAvatar(user.account_username).subscribe(
    //   data => {
    //     const avatar: GeneralResponse<Avatar> = JSON.parse(data);
    //   }
    // );
  }

  getAccountAvatarAuth(username: string) {
    this.apiService.accountAvatarGET(username, this.userSecurity.access_token).subscribe(
      data => {
        const temp = JSON.stringify(data);
        const avatar: GeneralResponse<Avatar> = JSON.parse(temp);
        this.userAvatar = avatar.data.avatar;
        console.log('Avatar is: ', this.userAvatar);
      },
      err => console.log(err),
      () => console.log('Avatar url is successfully retrieved.')
    );
  }
}
