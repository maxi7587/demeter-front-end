import { Injectable } from '@angular/core';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { Field } from './fields.service';

export class FieldRow extends DRFResource {
    public code: string;
    public field: Field;
}

@Injectable({
  providedIn: 'root'
})
export class FieldRowsService extends BasicDRFService<FieldRow> {
    protected _type = 'field_rows';
    public resource = FieldRow;
}
