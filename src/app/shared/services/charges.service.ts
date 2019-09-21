import { Injectable } from '@angular/core';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { Company } from 'src/app/shared/services/companies.service';
import { DRFResource, BasicDRFService } from 'src/app/shared/basic-drf.service';


export class Charge extends DRFResource {
    public name: string;
    public company: Company;
    public type = 'charges';
}

@Injectable({
  providedIn: 'root'
})
export class ChargesService extends CompanyDRFService<Charge> {
    public static actions_model: Array<ResponsiveAction> = [
        new ResponsiveAction('createElement', 'add', 'New charge')
    ];
    public resource = Charge;
    protected _type = 'charges';
}
