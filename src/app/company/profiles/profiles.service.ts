import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Profile {
    public id: string;
    public url: string;
    public company: {[key: string]: any};
    public contact: {[key: string]: any};
    public daily_working_hours: number;
    public first_name: string;
    public last_name: string;
    public role: string;
    public user: {[key: string]: any};
}

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

    constructor(private httpClient: HttpClient) { }

    public getProfiles(options?): Observable<{[key: string]: any}> {
        return this.httpClient.get(environment.APIURL + 'profiles/');
    }

}
