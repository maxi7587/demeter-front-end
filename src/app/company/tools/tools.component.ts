import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ToolDialogComponent } from 'src/app/company/tools/tool-dialog/tool-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Field } from 'src/app/shared/services/fields.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Task } from 'src/app/shared/services/tasks.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent extends CompanyTemplateComponent implements OnInit {

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: string;
    @Input() public field: Field;
    @Input() public overrideRowClick: boolean;
    @Output() public rowClick: EventEmitter<Task> = new EventEmitter();
    @Input() public createFromDialog: boolean;
    @Input() public showTabGroup = true;

    private _tools: {[key: string]: any} = {};
    set tools(tools: {[key: string]: any}) { this._tools = tools; }
    get tools(): {[key: string]: any} { return this._tools; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public status_options: Array<{[key: string]: string}> = [
        {name: 'available', value: 'available'},
        {name: 'unavailable', value: 'unavailable'}
    ];
    public filters_form: FormGroup = new FormGroup({
        status: new FormControl(this.status_options[0].value),
    });

    public constructor(
        protected router: Router,
        public matDialog: MatDialog,
        protected activatedRoute: ActivatedRoute,
        private toolsService: ToolsService,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        // this.toolsService.all().subscribe(tools => {
        //     this.tools = tools;
        //     // TODO: improve for mobile
        //     this.columns.push(new Column('name', 'name', 'name'));
        //     this.columns.push(new Column('status', 'status', '', '', 'center center'));
        //     this.columns.push(new Column('field.name', 'field', '', '', 'end center'));
        // });
    }

    public ngOnInit() {
        this.getList(this.filter);

        // Populate table columns
        // TODO: improve for mobile
        this.columns.push(new Column('name', 'name', 'name'));
        this.columns.push(new Column('field.name', 'field', ''));
        this.columns.push(new Column('info', 'name', '', 'info', 'end center'));

        this.filters_form.valueChanges
            .subscribe(
                filters => {
                    this.getList(filters);
                }
            );
    }

    public getList(filter) {
        console.log('inside getList', filter);
        this.toolsService
            // .all(undefined, undefined, 'name=&name__in=&name__startswith=&assigned_worker=7&assigned_worker__id=').subscribe(tasks => {
            .all(undefined, undefined, filter).subscribe(tools => {
                this.tools = tools;
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
        console.log('------ will navigate to tool-edit ------', element);

        this.router.navigate([this.router.url, element.id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

    public createElement() {
        if (this.createFromDialog) {
            // this.createButton.emit(new Task());
            this.createToolDialog();

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public createToolDialog(): void {
        console.log('should open tool dialog');
        const dialogRef = this.matDialog.open(ToolDialogComponent, {
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
