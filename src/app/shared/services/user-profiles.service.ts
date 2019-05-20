import { Injectable } from '@angular/core';
import { Field } from 'src/app/shared/services/fields.service';
import { User } from 'src/app/shared/services/users.service';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { ContractType } from 'src/app/shared/services/contract-types.service';
import { Charge } from 'src/app/shared/services/charges.service';
import { Company } from 'src/app/shared/services/companies.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export class Profile extends DRFResource {
    public company: Company;
    public contact: Contact = new Contact();
    public daily_working_hours: number;
    public first_name: string;
    public last_name: string;
    public cuit: number;
    public birth_date: string | Date;
    public role: string;
    public field: Field;
    public charge: Charge;
    public contract_type: ContractType;
    public user: User;
    public pinned: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfilesService extends CompanyDRFService<Profile> {
    public resource = Profile;
    protected _type = 'profiles';
}
