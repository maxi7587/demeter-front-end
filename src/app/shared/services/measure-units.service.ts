import { Injectable } from '@angular/core';
import { FilterFormGroup, FilterFormControl, FfcSelectOption } from 'src/app/shared/list/filters/filter';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { map } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

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

    public quantity_type_select_options = [
        new FfcSelectOption('area', 'area'),
        new FfcSelectOption('weight', 'weight')
    ];
    public filters_form: FilterFormGroup = new FilterFormGroup({
        quantity_type: new FilterFormControl()
            .setFfcType('select')
            .setFfcPlaceholder('Measure unit type')
            .addFfcSelectOptions(this.quantity_type_select_options)
    });
    public form: FilterFormGroup = new FilterFormGroup({
        quantity_type: new FilterFormControl()
            .setFfcType('select')
            .setFfcPlaceholder('Measure unit type')
            .addFfcSelectOptions(this.quantity_type_select_options)
    });
}
