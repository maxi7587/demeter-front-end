import { Injectable } from '@angular/core';
import { Company } from 'src/app/shared/services/companies.service';
import { DRFResource, BasicDRFService } from 'src/app/shared/basic-drf.service';


export class ContractType extends DRFResource {
    public name: string;
    public company: Company;
    public type = 'contract_types';
}

@Injectable({
  providedIn: 'root'
})
export class ContractTypesService extends BasicDRFService<ContractType> {
    protected _type = 'contract_types';
}
