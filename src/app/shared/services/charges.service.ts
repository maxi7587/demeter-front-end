import { Injectable } from '@angular/core';
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
export class ChargesService extends BasicDRFService<Charge> {
    protected _type = 'charges';
    public resource = Charge;
}
