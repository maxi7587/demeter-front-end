import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Profile {
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
export class TasksService {

    public constructor(private httpClient: HttpClient) { }

    public getTasks(options?): Observable<{[key: string]: any}> {
        return this.httpClient.get(environment.APIURL + 'tasks/');
    }

}
