import { Injectable } from '@angular/core';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';

export class Role {
    public name: string;
    public permissions: Array<string>; // TODO: improve permissions type after creating permissions service
}

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BasicDRFService<Role> {
    public _type = 'roles';
}
