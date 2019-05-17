import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
    public constructor (public httpClient: HttpClient) { }

    public resetPassword(
        email: string
    ): Observable<{message: string}> {
        return <Observable<{message: string}>>this.httpClient.post(
            environment.APIURL + 'reset_password',
            {
                email: email
            }
        );
    }
}
