import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { GeneralResponse } from '../Data Model/general-response';
import { Avatar } from '../interfases/avatar';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }

  constructor(private appService: AppService,
              private router: Router) {}

  checkLoggedIn(url: string): boolean {
    if (this.appService.getCookie()) {
      console.log('Token is: ', this.appService.userSecurity.account_username);
      this.appService.getAccountAvatar(this.appService.userSecurity.account_username).subscribe(
        data => {
          const temp = JSON.stringify(data);
          const avatar: GeneralResponse<Avatar> = JSON.parse(temp);
          this.appService.userAvatar = avatar.data.avatar;
          console.log('Avatar is: ', this.appService.userAvatar);
        },
        err => console.log(err),
        () => this.appService.redirectUrl = url
      );
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
