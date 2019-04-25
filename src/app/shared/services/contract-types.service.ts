import { Injectable } from '@angular/core';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
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
export class ContractTypesService extends CompanyDRFService<ContractType> {
    protected _type = 'contract_types';
    public resource = ContractType;
}
