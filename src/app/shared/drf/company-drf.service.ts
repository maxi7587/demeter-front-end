import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService, Company } from 'src/app/shared/services/companies.service';
import { HttpClient } from '@angular/common/http';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class CompanyDRFService<T> extends BasicDRFService<T> {
    protected company: Company;
    protected company_id: string;
    // protected company_observable =

    public constructor(
        protected router: Router,
        protected httpClient: HttpClient,
        protected oAuthService: OAuthService,
        protected companiesService: CompaniesService
    ) {
        super(httpClient, oAuthService);
        let company_id_index = this.router.url.split('/').indexOf('companies') + 1;
        this.company_id = this.router.url.split('/')[company_id_index];
        this._pre_route = ['companies', this.company_id];
    }
}
