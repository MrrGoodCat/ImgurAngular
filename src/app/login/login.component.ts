import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  URL = 'https://api.imgur.com/oauth2/authorize?client_id=068110f0021f5da&response_type=token&state=APPLICATION_STATE';


  ngOnInit() {
  }

  onLogin(): void {
    window.location.href = this.URL;
    // this.router.navigateByUrl(this.URL);
  }

}
