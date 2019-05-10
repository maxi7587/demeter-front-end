import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from 'src/app/shared/services/fields.service';
import { TaskDialogComponent } from 'src/app/company/tasks/task-dialog/task-dialog.component';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService, Task } from 'src/app/shared/services/tasks.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends CompanyTemplateComponent implements OnInit {

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: string;
    @Input() public field: Field;
    @Input() public overrideRowClick: boolean;
    @Input() public showTabGroup = true;
    @Output() public rowClick: EventEmitter<Task> = new EventEmitter();
    // @Input() public overrideCreate: boolean;
    // @Output() public createButton: EventEmitter<Task> = new EventEmitter();
    @Input() public createFromDialog: boolean;

    public status_options: Array<{[key: string]: string}> = [
        {name: 'all', value: undefined},
        {name: 'todo', value: 'todo'},
        {name: 'in_developement', value: 'in_developement'},
        {name: 'ready', value: 'ready'}
    ];
    public filters_form: FormGroup = new FormGroup({
        status: new FormControl(this.status_options[0].value),
    });

    private _tasks: {[key: string]: any} = {};
    set tasks(tasks: {[key: string]: any}) { this._tasks = tasks; }
    get tasks(): {[key: string]: any} { return this._tasks; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        private tasksService: TasksService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
    }

    public ngOnInit() {
        this.getList(this.filter);

        // Populate table columns
        // TODO: improve for mobile
        this.columns.push(new Column('name', 'name'));
        this.columns.push(new Column('field.name', 'field', '', '', 'end center'));

        this.filters_form.valueChanges
            .subscribe(
                filters => {
                    this.getList(filters);
                }
            );
    }

    public getList(filter) {
        this.tasksService
            // .all(undefined, undefined, 'name=&name__in=&name__startswith=&assigned_worker=7&assigned_worker__id=').subscribe(tasks => {
            .all(undefined, undefined, filter).subscribe(tasks => {
                this.tasks = tasks;
                // TODO: uncomment following for loop for desktop
                // for (let key of Object.keys(tasks.results[0])) {
                //     if (['id', 'url'].indexOf(key) === -1) {
                //         this.columns.push(new Column(key, key));
                //     }
                // }
            });
    }

    // public updateFilters(filters) {
    //     console.log(filters);
    // }

    public goToElement(element) {
        if (this.overrideRowClick) {
            this.rowClick.emit(element);

            return;
        }

        this.router.navigate([this.router.url, element.id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

    // public createElement() {
    //     if (this.overrideCreate) {
    //         this.createButton.emit(new Task());
    //
    //         return;
    //     }
    //     this.router.navigate([this.router.url, '0']);
    // }

    public createElement() {
        if (this.createFromDialog) {
            // this.createButton.emit(new Task());
            this.createTaskDialog();

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public createTaskDialog(): void {
        console.log('should open field plot dialog');
        const dialogRef = this.matDialog.open(TaskDialogComponent, {
            width: '720px',
            data: { field: this.field }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    console.log('The dialog was closed', result);
                    this.getList(this.filters_form.value);
                }
            }
        );
    }

}
