import { Injectable } from '@angular/core';
import { FieldPlot } from 'src/app/shared/services/field-plots.service';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { Company } from 'src/app/shared/services/companies.service';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Task extends DRFResource {
    public id: string;
    public url: string;
    public name: string;
    public company: Company;
    public field;
    public field_plot: FieldPlot;
    public task_type;
    public priority: number;
    public status: string;
    public started_at: string;
    public finished_at: string;
    public duration: number;
    public created_by;
    public supervised_by;
    public assigned_worker;
    public tool = [];
    public from_row;
    public to_row;
    public details: string;
}


@Injectable({
  providedIn: 'root'
})
export class TasksService extends CompanyDRFService<Task> {
    public resource = Task;
    protected _type = 'tasks';
}
