import { Injectable } from '@angular/core';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Field {
    public id: string;
    public url: string;
    public name: string;
    public company: {[key: string]: any};
    public manager: {[key: string]: any};
    public contact: {[key: string]: any};
    public details: string;
    public type: 'fields';
}

@Injectable({
  providedIn: 'root'
})
export class FieldsService extends CompanyDRFService<Field> {
    protected _type = 'fields';
}
