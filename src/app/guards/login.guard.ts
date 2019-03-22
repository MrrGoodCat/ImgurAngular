import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

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
    if (this.appService.accessToken) {
      return true;
    }
    this.appService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
