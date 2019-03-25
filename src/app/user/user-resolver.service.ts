import { Injectable } from '@angular/core';
import { GeneralResponse } from '../Data Model/general-response';
import { AccountBase } from '../Data Model/account-base';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserResolverService implements Resolve<GeneralResponse<AccountBase>> {

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<GeneralResponse<AccountBase>> {
            return this.userService.getAccountBase();
          }
  constructor(private userService: UserService) { }
}
