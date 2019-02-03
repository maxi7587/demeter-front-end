import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';

@Injectable()
export class FieldEditResolver implements Resolve<Observable<Field>> {
    protected field_id: string;

    public constructor(protected fieldsService: FieldsService) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        return this.fieldsService.get(activatedRouteSnapshot.params.objectId);
    }
}
