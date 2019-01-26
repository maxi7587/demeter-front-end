import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

    public constructor(protected httpClient: HttpClient) { }

    public all(type?, options?): Observable<DRFCollection<T>> {
        console.log('type ---->', this.type);

        return this.httpClient.get<DRFCollection<T>>(environment.APIURL +  (type || this.type) + '/');
    }

    public get(type, id, options?): Observable<T> {
        return this.httpClient.get<T>(environment.APIURL +  this.type + '/' + id + '/');
    }
}
