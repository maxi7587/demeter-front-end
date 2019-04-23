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
    // private client_id = '6g7ZLdmQ9NOKPmDWW04HRLdLDH9EKQuOcmccCXka';
    // private client_secret =
    // 'VbjzKD72h7SaMR9dFtWwajAK4UBhc43VAqZWHrSAQ1x3h50m2r318Ou95zAQ6npXEemrPC3ysuBbglcpHWRJJ3z4EWqY4m4hnIXUXgTn5sHw3oy6ahJhGnFlrZHosMI5';

    public constructor (public oAuthService: OAuthService) { }

    public login(username, password): Promise<{[key: string]: any}> {
        console.log('INSIDE login service login()');

        return this.oAuthService
            .fetchTokenUsingPasswordFlow(username, password)
            .then((data: {[key: string]: any}): {[key: string]: any} => {
                // localStorage.setItem('token', data.access_token.toString()); // Save the token in the local storage...
                // localStorage.setItem('refresh_token', data.refresh_token.toString()); // Save the token in the local storage...
                console.log('logged in, recieved data ---->', data);
                console.log('hasValidAccessToken ---->', this.oAuthService.hasValidAccessToken());

                return data;
            });
    }

    public refreshToken() {
        this.oAuthService.refreshToken().then(() => {
            console.log('ok');
        });
    }
}
