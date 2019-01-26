import { Injectable } from '@angular/core';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { Field } from './fields.service';

export class FieldElement {
    public code: string;
    public field: Field;
}

@Injectable({
  providedIn: 'root'
})
export class FieldElementsService extends BasicDRFService<FieldElement> {
    protected _type = 'field_elements';
}
