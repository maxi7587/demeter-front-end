import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class Company extends DRFResource {
    public name: string;
    public owner: {[key: string]: string};
    public cuit: number;
    public users: Array<{[key: string]: string}>;
    public details: string;
    public contact: {[key: string]: string};
    public type = 'companies';
}

@Injectable({
    providedIn: 'root'
})
export class CompaniesService extends BasicDRFService<Company> {
    private _company: Company;
    set company(company: Company) { this._company = company; }
    get company(): Company { return this._company; }

    public type = 'companies';

    public getCompanyFromId(company_id): Observable<Company> {
        return this.get(company_id)
            .pipe(
                tap(comapny => this._company = comapny)
            );
    }

    public storeCompanyId(company_id) {
        localStorage.setItem('demeter_company', company_id);
    }
}
