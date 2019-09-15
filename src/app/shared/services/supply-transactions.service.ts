import { Injectable } from '@angular/core';
import { Receipt } from 'src/app/shared/services/receipts.service';
import { Company } from 'src/app/shared/services/companies.service';
import { Field } from 'src/app/shared/services/fields.service';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { Supply } from 'src/app/shared/services/supplies.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';

export class SupplyTransaction extends DRFResource {
    date: Date;
    quantity: number;
    amount: number; // add currency when suported
    supply: Supply;
    type: 'input'|'output';
    status: 'draft'|'confirmed'|'failed';
    receipt: Receipt;
    field: Field;
    company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class SupplyTransactionsService extends CompanyDRFService<SupplyTransaction> {
    public resource = SupplyTransaction;
    protected _type = 'supply_transactions';
}
