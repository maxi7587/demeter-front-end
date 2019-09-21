import { Injectable } from '@angular/core';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
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
    public static actions_model: Array<ResponsiveAction> = [
        new ResponsiveAction('createElement', 'add', 'New contract type'),
    ];
    public resource = ContractType;
    protected _type = 'contract_types';
}
