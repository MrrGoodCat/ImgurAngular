import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private appService: AppService) { }

  getRefreshTokenURL = 'https://api.imgur.com/oauth2/authorize?client_id=068110f0021f5da&response_type=token&state=APPLICATION_STATE';


  ngOnInit() {
  }

  onLogin(): void {
    if (!this.appService.accessToken && this.appService.refreshToken) {
      console.log('Need to get access token.');
      console.log(this.appService.generateAccessTokenPOST());
    }
    // window.location.href = this.getRefreshTokenURL;
    // this.router.navigateByUrl(this.URL);
  }

}
