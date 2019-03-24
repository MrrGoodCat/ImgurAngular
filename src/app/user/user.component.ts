import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { GeneralResponse } from '../interfases/general-response';
import { AccountBase } from '../interfases/account-base';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  accData: GeneralResponse<AccountBase>;
  constructor(protected appService: AppService,
              ) { }

  ngOnInit() {
    this.appService.getAccountBase().subscribe(
      data => {
        this.accData = JSON.parse(data);
        console.log(this.accData);
        console.log(this.accData.data.url);
      }
    );
  }

}
