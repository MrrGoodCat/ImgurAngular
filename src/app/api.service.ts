import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  refreshToken = '6ba6731af03cab3214e26044319eab989c380a4c';
  clientId = '068110f0021f5da';
  clientSecret = 'b55270a2853c88b26f7475f703f45d1d71093a9f';

  generateAccessTokenPOST(): Observable<any> {
    const body = { refresh_token: this.refreshToken,
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'refresh_token' };
    return this.http.post('https://api.imgur.com/oauth2/token', body)
                .pipe(map((res: Response) => JSON.stringify(res)));
  }

  accountAvatarGET(username: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
    const options = { headers };
    const url = `https://api.imgur.com/3/account/${username}/avatar`;
    console.log('Avatar url is: ', url);
    console.log('Avatar token is: ', accessToken);
    return this.http.get(url, options);
  }

  accountBaseGET(username: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Client-ID ${this.clientId}` });
    const options = { headers };
    return this.http.get(`https://api.imgur.com/3/account/${username}`, options);
  }
}
