import { Injectable } from '@angular/core';
import { GeneralResponse } from '../Data Model/general-response';
import { AccountBase } from '../Data Model/account-base';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable()
export class UserResolverService implements Resolve<GeneralResponse<AccountBase>> {

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<GeneralResponse<AccountBase>> {
            const username = route.paramMap.get('username');
            return this.apiService.accountBaseGET(username);
          }
  constructor(private apiService: ApiService) { }
}
