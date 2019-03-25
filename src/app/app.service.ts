import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  refreshToken = '6ba6731af03cab3214e26044319eab989c380a4c';
  accountId = '40164026';
  accountUserName = 'MrrGoodCat';
  tokenType = 'bearer';
  accessToken: string; // = '45b24886d3f2cd654d0ae178d3e3d5fafddc3fdc';
  clientId = '068110f0021f5da';
  clientSecret = 'b55270a2853c88b26f7475f703f45d1d71093a9f';

  redirectUrl: string;
  isLoggedIn = false;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  generateAccessTokenPOST(): Observable<any> {
    const body = { refresh_token: this.refreshToken,
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'refresh_token' };
    return this.http.post('https://api.imgur.com/oauth2/token', body)
                .pipe(map((res: Response) => JSON.stringify(res)));
  }
}
