import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TasksService, Task } from 'src/app/shared/services/tasks.service';

@Injectable()
export class TaskEditResolver implements Resolve<Observable<Task>> {
    protected task_id: string;

    public constructor(protected tasksService: TasksService) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        return this.tasksService.get(activatedRouteSnapshot.params.objectId);
    }
}
