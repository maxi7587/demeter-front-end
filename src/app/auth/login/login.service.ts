import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    // private login_url = environment.APIURL + 'api-auth/login/';
    private login_url = environment.APIURL + 'o/token/';
    private client_id = 'QCxjWmztrYNaTUqUhtKtPrfvRyyx8hflups1ZnGo';
    private client_secret =
        'DM4f0qkil41Y8Q4Iv7AmzVGntCkKaGksZKCsyrfPvPlyuG57JJJYKD6TxuHz3N9JBEih41vB9ciieh3cv4y7mTjtreuhthyLPcmkHWdI9KvdRQWBVSq3hukCuV0QTAko';

    public constructor (public oAuthService: OAuthService) { }

    public login(username, password): Promise<void> {
        console.log('INSIDE login service login()');

        return this.oAuthService.fetchTokenUsingPasswordFlow(username, password).then((resp) => {
              // Loading data about the user
              return this.oAuthService.loadUserProfile();
        }).then(data => {
              // Using the loaded user data
              // let claims = this.oAuthService.getIdentityClaims();
              // if (claims) {
              //     console.log('given_name ----', claims.given_name);
              // }
              console.log('logged in, recieved data ---->', data);
        });
    }

    public refreshToken() {
        this.oAuthService.refreshToken().then(() => {
            console.log('ok');
        });
    }
}
