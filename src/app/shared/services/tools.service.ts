import { Injectable } from '@angular/core';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { TaskType } from './task-types.service';
import { Field } from './fields.service';
import { Company } from './companies.service';

export class Tool extends DRFResource {
    public name: string;
    public code: string;
    public internal_code: string;
    public status: string;
    public field: Field;
    public task_type: TaskType;
    public company: Company;
    public pinned: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService extends CompanyDRFService<Tool> {
    public static actions_model: Array<ResponsiveAction> = [
        new ResponsiveAction('createElement', 'add', 'New tool')
    ];
    public resource = Tool;
    protected _type = 'tools';
}
