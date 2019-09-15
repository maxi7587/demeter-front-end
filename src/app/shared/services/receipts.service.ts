import { Injectable } from '@angular/core';
import { SupplyTransaction } from 'src/app/shared/services/supply-transactions.service';
import { Company } from 'src/app/shared/services/companies.service';
import { Field } from 'src/app/shared/services/fields.service';
import { DRFResource } from 'src/app/shared/basic-drf.service';
import { Supply } from 'src/app/shared/services/supplies.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';

export class Receipt extends DRFResource {
    document_id: string;
    date: Date;
    amount: number; // add currency when suported
    type: 'input'|'output';
    status: 'draft'|'confirmed'|'failed';
    field: Field;
    receipt_supply_transactions: Array<SupplyTransaction>;
    company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService extends CompanyDRFService<Receipt> {
    public resource = Receipt;
    protected _type = 'receipts';
}
