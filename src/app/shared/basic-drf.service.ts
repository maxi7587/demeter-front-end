import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

export class DRFResource {
    public id: string;
    public url: string;

    public attributeIsObject(attribute: string): boolean {
        return typeof this[attribute] === 'object' && this[attribute] !== null;
    }

    public setAttributes(attributes_object): this {
        for (let attribute in attributes_object) {
            // TODO: should be "if (this.hasOwnProperty(attribute)) {""
            if (attributes_object.hasOwnProperty(attribute)) {
                this[attribute] = attributes_object[attribute];
            }
        }

        return this;
    }

    public canShowAttribute(attribute: string): boolean {
        return ['id', 'url'].indexOf(attribute) === -1;
    }
}

export class DRFCollection<T> {
    public count: number;
    public next: string;
    public previous: string;
    private _results: Array<T>;
    set results(results: Array<T>) { this._results = results; }
    get results(): Array<T> { return this._results; }
}

@Injectable({
    providedIn: 'root'
})
export class BasicDRFService<T extends DRFResource = DRFResource> {
    public resource = DRFResource;
    // set resource(resource: T) { this._resource = resource; }
    // get resource(): T { return this._resource; }

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

    public formatFilter(filter_object: { [key: string]: string | number }): string {
        let filter_string: string;
        for (let key in filter_object) {
            if (filter_object[key]) {
                if (!filter_string) {
                    filter_string = '?';
                } else {
                    filter_string += '&';
                }
                filter_string += `${key}=${filter_object[key]}`;
            }
        }
        console.log('filter_string -------->', filter_string);

        return filter_string;
    }

    public getPreRoute(): Array<string> { return undefined; }

    public all(
        route?: string, headers?: HttpHeaders, filter?: {[key: string]: string | number}
    ): Observable<DRFCollection<T>> {
        let url: string = environment.APIURL
            +  (route || ((this.getPreRoute() ? this.getPreRoute().join('/') + '/' : '') + this.type)) + '/';

        let filter_string = this.formatFilter(filter);

        if (filter_string) {
            url = url + filter_string;
        }

        return this.httpClient.get<DRFCollection<T>>(
            url,
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        ).pipe(
            map(
                collection => {
                    let results = [];
                    for (let resource of collection.results) {
                        results.push(
                            (<T>new this.resource().setAttributes(resource))
                        );
                    }
                    collection.results = results;

                    return collection;
                }
            )
        );
    }

    public get(id, route?,  headers?): Observable<T> {
        console.log(' ------------- called get -------------->', this);
        return this.httpClient.get<T>(
            environment.APIURL +  (route || this.type) + '/' + id + '/',
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        ).pipe(
            map(resource => (<T>new this.resource()).setAttributes(resource))
        );
    }

    public post(data, route?, headers?): Observable<T> {
        return this.httpClient.post<T>(
            environment.APIURL +  (route || this.type) + '/',
            data,
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        ).pipe(
            map(resource => (<T>new this.resource()).setAttributes(resource))
        );
    }

    public patch(data, route?, headers?): Observable<T> {
        return this.httpClient.patch<T>(
            environment.APIURL +  (route || this.type) + '/' + data.id + '/',
            data,
            // TODO: remove header from here... oauth sendAccessTokenConfig should work
            { headers: headers || this.headers }
        ).pipe(
            map(resource => (<T>new this.resource().setAttributes(resource)))
        );
    }

    public save(resource: DRFResource): Observable<T> {
        console.log('INSIDE BASIC DRF SERVICE SAVE METHOD');
        if (resource.id && resource.id !== '0') {
            console.log('inside 1st inf', resource.id);
            return (<Observable<T>>this.patch(resource));
        } else {
            console.log('will delete resource id', resource.id);
            delete resource.id;
            console.log('deleted resource id');
            return (<Observable<T>>this.post(resource));
        }
    }
}
