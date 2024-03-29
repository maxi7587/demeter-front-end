import { Injectable } from '@angular/core';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';

export class Role extends DRFResource {
    public name: string;
    public permissions: Array<string>; // TODO: improve permissions type after creating permissions service
}

@Injectable({
  providedIn: 'root'
})
export class RolesService extends CompanyDRFService<Role> {
    public resource = Role;
    public _type = 'roles';
}
