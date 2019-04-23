import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/services/users.service';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export class Company extends DRFResource {
    public name: string;
    public owner: User;
    public cuit: number;
    public users: Array<User>;
    public details: string;
    public contact: Contact = new Contact();
    public type = 'companies';
}

@Injectable({
    providedIn: 'root'
})
export class CompaniesService extends BasicDRFService<Company> {
    public resource = Company;

    private _company: Company;
    set company(company: Company) { this._company = company; }
    get company(): Company { return this._company; }

    public type = 'companies';

    public getAndSetCompanyFromId(company_id): Observable<Company> {
        if (this._company && this._company.id === company_id) {
            return of(this._company);
        }

        return this.get(company_id)
            .pipe(
                tap(comapny => this._company = comapny)
            );
    }

    public storeCompanyId(company_id) {
        localStorage.setItem('demeter_company', company_id);
    }

    public getCompanyIdFromURL(parent_url_section = 'companies'): string {
        let splitted_url = location.href.split('/');
        console.log('splitted_url', splitted_url);
        let company_id_index: number = splitted_url.indexOf(parent_url_section) + 1;
        console.log('company_id_index', company_id_index);
        let company_id: string = splitted_url[company_id_index];
        console.log('company_id', company_id);

        return company_id;
    }
}
