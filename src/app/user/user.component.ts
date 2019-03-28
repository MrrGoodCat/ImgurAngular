import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { GeneralResponse } from '../Data Model/general-response';
import { AccountBase } from '../Data Model/account-base';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {


  constructor(protected appService: AppService,
              protected userService: UserService,
              private route: ActivatedRoute) { }

  onUserRetrived(user: GeneralResponse<AccountBase>): void {
    const tempData = JSON.stringify(user);
    const accData: GeneralResponse<AccountBase> = JSON.parse(tempData);
    this.userService.accountBaseInformation = accData.data;
    console.log(accData);
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      const resolvedData: GeneralResponse<AccountBase> = data.userBase; // ['userBase'];
      this.onUserRetrived(data.userBase);
    });
  }

}
