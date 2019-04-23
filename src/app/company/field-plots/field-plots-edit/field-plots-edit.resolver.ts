import { Injectable } from '@angular/core';
import { FieldPlot, FieldPlotsService } from 'src/app/shared/services/field-plots.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class FieldPlotEditResolver implements Resolve<Observable<FieldPlot>> {
    protected field_id: string;

    public constructor(
        protected fieldPlotsService: FieldPlotsService,
        protected companiesService: CompaniesService
    ) {
        console.log('---------------------- FieldPlotEditResolver constructor ----------------------');
    }

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (activatedRouteSnapshot.params.objectId === '0') {
            let field_plot = new FieldPlot();
            // Should use companiesService.comapny instead of the observable?
            return this.companiesService
                .get(activatedRouteSnapshot.parent.params.company_id)
                .pipe(
                    map(
                        (company) => {
                            field_plot.company = company;
                            return field_plot;
                        }
                    )
                );
        } else {
            return <Observable<FieldPlot>>this.fieldPlotsService.get(activatedRouteSnapshot.params.objectId);
        }
    }
}
