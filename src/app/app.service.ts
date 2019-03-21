import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  refreshToken = '6ba6731af03cab3214e26044319eab989c380a4c';
  accountId = '40164026';
  accountUserName = 'MrrGoodCat';
  tokenType = 'bearer';
  accessToken: string; // = 'b2116f9e01d1a282593b5f603ba2698f241c1588';
  clientId = '068110f0021f5da';
  clientSecret = 'b55270a2853c88b26f7475f703f45d1d71093a9f';

  constructor(private http: HttpClient) {
  }

  generateAccessTokenPOST(): any {
    const body = { refresh_token: this.refreshToken,
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'refresh_token' };
    return this.http.post('https://api.imgur.com/oauth2/token', body);
  }
}
