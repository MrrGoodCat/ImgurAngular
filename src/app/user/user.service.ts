import { Injectable } from '@angular/core';
import { AccountBase } from '../Data Model/account-base';
import { ActivatedRoute } from '@angular/router';
import { GeneralResponse } from '../Data Model/general-response';

@Injectable()
export class UserService {

  constructor() { }

  accountBaseInformation = new AccountBase();

  onUserRetrived(user: GeneralResponse<AccountBase>): void {
    const tempData = JSON.stringify(user);
    const accData: GeneralResponse<AccountBase> = JSON.parse(tempData);
    this.accountBaseInformation = accData.data;
    console.log(accData);
  }
}
