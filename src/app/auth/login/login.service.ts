import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    // private login_url = environment.APIURL + 'api-auth/login/';
    private login_url = environment.APIURL + 'o/token/';
    private client_id = 'QCxjWmztrYNaTUqUhtKtPrfvRyyx8hflups1ZnGo';
    private client_secret =
        'DM4f0qkil41Y8Q4Iv7AmzVGntCkKaGksZKCsyrfPvPlyuG57JJJYKD6TxuHz3N9JBEih41vB9ciieh3cv4y7mTjtreuhthyLPcmkHWdI9KvdRQWBVSq3hukCuV0QTAko';

    public constructor (
        private httpClient: HttpClient
    ) { }

    public login() {
        console.log('INSIDE login service login()');

        return this.httpClient.post(
            this.login_url,
            {
                grant_type: 'password',
                username: 'test',
                password: 'test',
                client_id: this.client_id,
                client_secret: this.client_secret
            }
        );
    }
}
