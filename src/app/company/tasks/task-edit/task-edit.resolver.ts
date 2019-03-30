import { Injectable } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TasksService, Task } from 'src/app/shared/services/tasks.service';

@Injectable()
export class TaskEditResolver implements Resolve<Observable<Task>> {
    public constructor(
        protected tasksService: TasksService,
        protected companiesService: CompaniesService,
    ) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (activatedRouteSnapshot.params.objectId === '0') {
            let task = new Task();
            // Should use companiesService.comapny instead of the observable?
            return this.companiesService
                .get(activatedRouteSnapshot.parent.params.company_id)
                .pipe(
                    map(
                        (company) => {
                            task.company = company;
                            return task;
                        }
                    )
                );
        } else {
            console.log('will get ---->', activatedRouteSnapshot.params.objectId);
            return this.tasksService.get(activatedRouteSnapshot.params.objectId);
        }
    }
}
