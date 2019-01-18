import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/company/tasks/tasks.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    private _tasks: {[key: string]: any} = {};
    set tasks(tasks: {[key: string]: any}) { this._tasks = tasks; }
    get tasks(): {[key: string]: any} { return this._tasks; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(private tasksService: TasksService) {
        this.tasksService.getTasks().subscribe(tasks => {
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
