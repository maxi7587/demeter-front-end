import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { OAuthService } from 'angular-oauth2-oidc';

export class Company {
    public id: string;
    public url: string;
    public name: string;
    public owner: {[key: string]: string};
    public users: Array<{[key: string]: string}>;
    public details: string;
    public contact: {[key: string]: string};
}

@Injectable({
    providedIn: 'root'
})
export class CompaniesService extends BasicDRFService<Company> {
    private _company: Company;
    set company(company: Company) { this._company = company; }
    get company(): Company { return this._company; }

    type = 'companies';

    public constructor(httpClient: HttpClient, protected oAuthService: OAuthService) {
        super(httpClient, oAuthService);
        this.get();
        console.log('type in companies...', this.type);
    }

    public storeCompanyId(company_id) {
        localStorage.setItem('demeter_company', company_id);
    }
}
