import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SuppliesService, Supply } from 'src/app/shared/services/supplies.service';

@Injectable()
export class SupplyEditResolver implements Resolve<Observable<Supply>> {
    protected profile_id: string;

    public constructor(protected suppliesService: SuppliesService) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (activatedRouteSnapshot.params.objectId === '0') {
            return observableOf(new Supply());
        }
        return <Observable<Supply>>this.suppliesService.get(activatedRouteSnapshot.params.objectId);
    }
}
