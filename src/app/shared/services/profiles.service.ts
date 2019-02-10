import { Injectable } from '@angular/core';
import { ContractType } from 'src/app/shared/services/contract-types.service';
import { Charge } from 'src/app/shared/services/charges.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Profile {
    public id: string;
    public url: string;
    public company: {[key: string]: any};
    public contact: {[key: string]: any};
    public daily_working_hours: number;
    public first_name: string;
    public last_name: string;
    public cuit: number;
    public birth_date: string | Date;
    public role: string;
    public charge: Charge;
    public contract_type: ContractType;
    public user: {[key: string]: any};
}

@Injectable({
  providedIn: 'root'
})
export class ProfilesService extends CompanyDRFService<Profile> {
    protected _type = 'profiles';
}
