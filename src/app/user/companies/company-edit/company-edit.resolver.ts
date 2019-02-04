import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CompaniesService, Company } from 'src/app/shared/services/companies.service';

@Injectable()
export class CompanyEditResolver implements Resolve<Observable<Company>> {
    protected company_id: string;

    public constructor(protected companiesService: CompaniesService) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (activatedRouteSnapshot.params.objectId === '0') {
            return observableOf(new Company());
        }
        return this.companiesService.get(activatedRouteSnapshot.params.objectId);
    }
}
