import { Injectable } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ToolsService, Tool } from 'src/app/shared/services/tools.service';

@Injectable()
export class ToolEditResolver implements Resolve<Observable<Tool>> {
    protected tool_id: string;

    public constructor(
        protected toolsService: ToolsService,
        protected companiesService: CompaniesService,
    ) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (activatedRouteSnapshot.params.objectId === '0') {
            let tool = new Tool();
            // Should use companiesService.comapny instead of the observable?
            return this.companiesService
                .get(activatedRouteSnapshot.parent.params.company_id)
                .pipe(
                    map(
                        (company) => {
                            tool.company = company;
                            return tool;
                        }
                    )
                );
        } else {
            console.log('will get ---->', activatedRouteSnapshot.params.objectId);
            return (<Observable<Tool>>this.toolsService.get(activatedRouteSnapshot.params.objectId));
        }
    }
}
