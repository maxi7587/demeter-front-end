import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

export class DRFResource {
    public id: string;
    public url: string;
}

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

    protected _pre_route: Array<string>;
    get pre_route(): Array<string> { return this._pre_route; }

    // TODO: remove header from here... oauth sendAccessTokenConfig should work
    protected headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.oAuthService.authorizationHeader()
    });

    public constructor(protected httpClient: HttpClient, protected oAuthService: OAuthService) {}

    public getAuthorizationHeaders() {
        this.headers = new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': this.oAuthService.authorizationHeader()
        });
    }

    public all(route?, headers?): Observable<DRFCollection<T>> {
        console.log('headers in BasicDRFService --->', this.headers);
        return this.httpClient.get<DRFCollection<T>>(
            environment.APIURL +  (route || ((this.pre_route ? this.pre_route.join('/') + '/' : '') + this.type)) + '/',
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        );
    }

    public get(id, route?,  headers?): Observable<T> {
        return this.httpClient.get<T>(
            environment.APIURL +  (route || this.type) + '/' + id + '/',
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        );
    }

    public post(data, route?, headers?): Observable<T> {
        return this.httpClient.post<T>(
            environment.APIURL +  (route || this.type) + '/',
            data,
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        );
    }

    public patch(data, route?, headers?): Observable<T> {
        return this.httpClient.patch<T>(
            environment.APIURL +  (route || this.type) + '/',
            data,
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        );
    }

    public save(resource: DRFResource): Observable<T> {
        console.log('INSIDE BASIC DRF SERVICE SAVE METHOD');
        if (resource.id && resource.id !== '0') {
            console.log('inside 1st inf', resource.id);
            return this.patch(resource);
        } else {
            console.log('will delete resource id', resource.id);
            delete resource.id;
            console.log('deleted resource id');
            return this.post(resource);
        }
    }
}
