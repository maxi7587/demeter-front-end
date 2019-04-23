import { Injectable } from '@angular/core';
import { DashboardComponent } from 'src/app/company/dashboard/dashboard.component';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';

@Injectable()
export class FieldEditResolver implements Resolve<Observable<Field>> {
    protected field_id: string;

    public constructor(
        protected fieldsService: FieldsService,
        protected companiesService: CompaniesService
    ) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (activatedRouteSnapshot.params.objectId === '0') {
            let field = new Field();
            // Should use companiesService.comapny instead of the observable?
            return this.companiesService
                .get(activatedRouteSnapshot.parent.params.company_id)
                .pipe(
                    map(
                        (company) => {
                            field.company = company;
                            return field;
                        }
                    )
                );
        } else {
            return <Observable<Field>>this.fieldsService.get(activatedRouteSnapshot.params.objectId);
        }
    }
}
