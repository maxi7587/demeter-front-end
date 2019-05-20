import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

    public constructor (public httpClient: HttpClient) { }

    public changePassword(
        email: string,
        token: string,
        new_password: string,
        new_password_confirmation: string
    ): Observable<{detail: string}> {
        return <Observable<{detail: string}>>this.httpClient.post(
            environment.APIURL + 'change_password',
            {
                email: email,
                token: token,
                new_password: new_password,
                new_password_confirmation: new_password_confirmation
            }
        );
    }
}
