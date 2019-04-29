import { Injectable } from '@angular/core';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { Field } from './fields.service';
import { Company } from './companies.service';

export class Tool extends DRFResource {
    public name: string;
    public code: string;
    public internal_code: string;
    public status: string;
    public field: Field;
    public company: Company;
    public pinned: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService extends CompanyDRFService<Tool> {
    public resource = Tool;
    protected _type = 'tools';
}
