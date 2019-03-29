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
              protected appService: AppService) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.appService.onLoggIn();
  }
}
