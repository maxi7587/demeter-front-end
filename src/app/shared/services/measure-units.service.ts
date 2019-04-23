import { Injectable } from '@angular/core';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { map } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';

export class MeasureUnit extends DRFResource {
    public id: string;
    public quantity_type: 'area'|'weight';
}

@Injectable({
  providedIn: 'root'
})
export class MeasureUnitsService extends BasicDRFService<MeasureUnit> {
    protected _type = 'measure_units';
    public resource = MeasureUnit;
}
