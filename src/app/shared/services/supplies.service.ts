import { Injectable } from '@angular/core';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { Company } from 'src/app/shared/services/companies.service';
import { Field } from 'src/app/shared/services/fields.service';
import { MeasureUnit } from 'src/app/shared/services/measure-units.service';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';

export class Supply extends DRFResource {
    name: string;
    price: number;
    measure_unit: MeasureUnit;
    actual_stock: number;
    pending_stock: number;
    desired_stock: number;
    field: Field;
    company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class SuppliesService extends CompanyDRFService<Supply> {
    public static actions_model: Array<ResponsiveAction> = [
        new ResponsiveAction('createElement', 'add', 'New supply'),
        new ResponsiveAction('createInputReceipt', 'add', 'Input receipt'),
        new ResponsiveAction('createOutputReceipt', 'add', 'Output receipt'),
        new ResponsiveAction('createInputTransaction', 'add', 'Input transaction'),
        new ResponsiveAction('createOutputTransaction', 'add', 'Output transaction')
    ];
    public resource = Supply;

    protected _type = 'supplies';

}
