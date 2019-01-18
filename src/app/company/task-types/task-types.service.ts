import { Injectable } from '@angular/core';
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
export class TaskTypesService {

    public constructor(private httpClient: HttpClient) { }

    public getTaskTypes(options?): Observable<{[key: string]: any}> {
        return this.httpClient.get(environment.APIURL + 'task_types/');
    }

}
