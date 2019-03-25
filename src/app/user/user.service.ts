import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { AccountBase } from '../Data Model/account-base';

@Injectable()
export class UserService {

  constructor(private appService: AppService,
              private http: HttpClient) { }

  accountBaseInformation = new AccountBase();

  getAccountBase(username: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Client-ID 068110f0021f5da' });
    const options = { headers };
    return this.http.get(`https://api.imgur.com/3/account/${username}`, options);
  }
}
