import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Field {
    public id: string;
    public url: string;
    public name: string;
    public company: {[key: string]: any};
    public manager: {[key: string]: any};
    public contact: {[key: string]: any};
    public details: string;
}

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
    constructor(private httpClient: HttpClient) { }

    public getFields(options?): Observable<{[key: string]: any}> {
        return this.httpClient.get(environment.APIURL + 'fields/');
    }
}
