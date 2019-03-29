import { Component, OnInit } from '@angular/core';
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


  constructor(protected userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAccountBase();
  }

  getAccountBase() {
    this.route.data.subscribe(data => {
      const resolvedData: GeneralResponse<AccountBase> = data.userBase; // ['userBase'];
      console.log('got data: ', data.userBase);
      this.userService.onUserRetrived(data.userBase);
    });
  }
}
