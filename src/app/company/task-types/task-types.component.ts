import { Component, OnInit } from '@angular/core';
import { TaskTypesService } from 'src/app/company/task-types/task-types.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-task-types',
  templateUrl: './task-types.component.html',
  styleUrls: ['./task-types.component.scss']
})
export class TaskTypesComponent implements OnInit {

    private _task_types: {[key: string]: any} = {};
    set tasks(task_types: {[key: string]: any}) { this._task_types = task_types; }
    get task_types(): {[key: string]: any} { return this._task_types; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(private taskTypesService: TaskTypesService) {
        this.taskTypesService.getTaskTypes().subscribe(tasks => {
            this.tasks = tasks;
            console.log(tasks);
            console.log(tasks.results[0]);
            // TODO: uncomment following for loop for desktop
            // for (let key of Object.keys(tasks.results[0])) {
            //     if (['id', 'url'].indexOf(key) === -1) {
            //         this.columns.push(new Column(key, key));
            //     }
            // }

            // TODO: improve for mobile
            this.columns.push(new Column('first_name', 'first_name', 'first_name'));
            this.columns.push(new Column('info', 'first_name', '', 'info', 'end center'));
        });
    }

    public ngOnInit() {}

}
