import { Injectable } from '@angular/core';
import { CompanyDRFService } from 'src/app/shared/drf/company-drf.service';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from 'src/app/shared/services/companies.service';

export class TaskType {
    name: string;
    company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class TaskTypesService extends CompanyDRFService<TaskType> {
    protected _type = 'task_types';
}
