import { Injectable } from '@angular/core';
import { Supply } from 'src/app/shared/services/supplies.service';
import { Company } from 'src/app/shared/services/companies.service';
import { Field } from 'src/app/shared/services/fields.service';
import { MeasureUnit } from 'src/app/shared/services/measure-units.service';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';

export class FieldSupplyStock extends DRFResource {
    actual_stock: number;
    pending_stock: number;
    desired_stock: number;
    supply: Supply;
    field: Field;
    company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class FieldSupplyStocksService extends CompanyDRFService<FieldSupplyStock> {
    public resource = FieldSupplyStock;
    protected _type = 'field_supply_stocks';
}
