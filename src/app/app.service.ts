import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserSecurity } from './Data Model/user-security';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  refreshToken = '6ba6731af03cab3214e26044319eab989c380a4c';
  accountId = '40164026';
  accountUserName = 'MrrGoodCat';
  userAvatar: string;
  tokenType = 'bearer';
  accessToken: string; // = '45b24886d3f2cd654d0ae178d3e3d5fafddc3fdc';
  clientId = '068110f0021f5da';
  clientSecret = 'b55270a2853c88b26f7475f703f45d1d71093a9f';

  redirectUrl: string;
  isLoggedIn = false;

  userSecurity = new UserSecurity();

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router) {
  }

  generateAccessTokenPOST(): Observable<any> {
    const body = { refresh_token: this.refreshToken,
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'refresh_token' };
    return this.http.post('https://api.imgur.com/oauth2/token', body)
                .pipe(map((res: Response) => JSON.stringify(res)));
  }

  getAccountAvatar(username: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.userSecurity.access_token}` });
    const options = { headers };
    return this.http.get(`https://api.imgur.com/3/account/${username}/avatar`, options);
  }

  onLogOut(): void {
    this.isLoggedIn = false;
    // this.cookieService.delete('Imgur_token');
    this.cookieService.deleteAll('/', 'localhost');
    this.userSecurity = null;
    this.router.navigate(['/login']);
  }
}
