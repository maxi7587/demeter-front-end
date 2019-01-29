import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

export class DRFCollection<T> {
    private count: number;
    private next: number;
    private previous: number;
    private _results: Array<T>;
    set results(results: Array<T>) { this._results = results; }
    get results(): Array<T> { return this._results; }
}

@Injectable({
    providedIn: 'root'
})
export class BasicDRFService<T> {
    protected _type: string;
    set type(type: string) { this._type = type; }
    get type(): string { return this._type; }

    // TODO: remove header from here... oauth sendAccessTokenConfig should work
    protected headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.oAuthService.authorizationHeader()
    });

    public constructor(protected httpClient: HttpClient, protected oAuthService: OAuthService) {}

    public all(type?, headers?): Observable<DRFCollection<T>> {
        return this.httpClient.get<DRFCollection<T>>(
            environment.APIURL +  (type || this.type) + '/',
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        );
    }

    public get(id, headers?): Observable<T> {
        return this.httpClient.get<T>(
            environment.APIURL +  this.type + '/' + id + '/',
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        );
    }

    public post(data, headers?): Observable<T> {
        return this.httpClient.post<T>(
            environment.APIURL +  this.type + '/',
            data,
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        );
    }
}
