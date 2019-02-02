import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/shared/services/tasks.service';
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

    public constructor(
        private tasksService: TasksService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.tasksService.all().subscribe(tasks => {
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
            this.columns.push(new Column('name', 'name', 'name'));
            this.columns.push(new Column('field', 'field', ''));
            this.columns.push(new Column('info', 'name', '', 'info', 'end center'));
        });
    }

    public ngOnInit() {}

    public goToElement(element_id) {
        console.log('id ---->', element_id);
        this.router.navigate([this.router.url, element_id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

}
