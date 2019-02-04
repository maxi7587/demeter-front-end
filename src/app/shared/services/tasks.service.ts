import { Injectable } from '@angular/core';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Task {
    public id: string;
    public url: string;
    public name: string;
    public field;
    public task_type;
    public priority: number;
    public status: string;
    public started_at: string;
    public finished_at: string;
    public duration: number;
    public created_by;
    public supervised_by;
    public assigned_worker;
    public tool;
    public from_element;
    public to_element;
    public details: string;
}


@Injectable({
  providedIn: 'root'
})
export class TasksService extends CompanyDRFService<Task> {
    protected _type = 'tasks';
}
