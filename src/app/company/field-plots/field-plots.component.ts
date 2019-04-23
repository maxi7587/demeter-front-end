import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldPlotInfoDialogComponent } from 'src/app/company/field-plots/field-plot-info-dialog/field-plot-info-dialog.component';
import { FieldPlotDialogComponent } from 'src/app/company/field-plots/field-plot-dialog/field-plot-dialog.component';
import { FieldPlot, FieldPlotsService } from 'src/app/shared/services/field-plots.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from 'src/app/shared/services/fields.service';

@Component({
    selector: 'app-field-plots',
    templateUrl: './field-plots.component.html',
    styleUrls: ['./field-plots.component.scss']
})
export class FieldPlotsComponent extends CompanyTemplateComponent implements OnInit {

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public route: string;
    @Input() public filter: string;
    @Input() public field: Field;
    @Input() public overrideRowClick: boolean;
    @Input() public addFieldPlotLink: string;
    @Output() public rowClick: EventEmitter<FieldPlot> = new EventEmitter();

    private _field_plots: {[key: string]: any} = {};
    set field_plots(field_plots: {[key: string]: any}) { this._field_plots = field_plots; }
    get field_plots(): {[key: string]: any} { return this._field_plots; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public status_options: Array<{[key: string]: string}> = [
        {name: 'active', value: 'active'},
        {name: 'inactive', value: 'inactive'}
    ];
    public filters_form: FormGroup = new FormGroup({
        status: new FormControl(this.status_options[0].value),
    });

    public constructor(
        private dialog: MatDialog,
        private fieldPlotsService: FieldPlotsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
    }

    public ngOnInit() {
        this.getList(this.route, this.filter);

        // Populate table columns
        // TODO: improve for mobile
        this.columns.push(new Column('label', 'label', 'label'));
        this.columns.push(new Column('info', 'label', '', 'info', 'end center'));

        this.filters_form.valueChanges
            .subscribe(
                filters => {
                    this.getList(this.route, filters);
                }
            );
    }

    public getList(route, filter) {
        this.fieldPlotsService
            // .all(undefined, undefined, 'name=&name__in=&name__startswith=&assigned_worker=7&assigned_worker__id=').subscribe(tasks => {
            .all(route, undefined, filter).subscribe(plots => {
                this.field_plots = plots;
                // TODO: uncomment following for loop for desktop
                // for (let key of Object.keys(tasks.results[0])) {
                //     if (['id', 'url'].indexOf(key) === -1) {
                //         this.columns.push(new Column(key, key));
                //     }
                // }
            });
    }

    public goToElement(element) {
        if (this.overrideRowClick) {
            this.rowClick.emit(element);

            return;
        }

        console.log('will navigate to field plot -->', this.router.url, element.id);

        this.showFieldPlotInfoDialog(element);
        // this.router.navigate([this.router.url, element.id]);
    }

    public showFieldPlotInfoDialog(field_plot: FieldPlot): void {
        console.log('should open field plot dialog');
        const dialogRef = this.dialog.open(FieldPlotInfoDialogComponent, {
            width: '480px',
            data: { field_plot: field_plot }
        });

        // dialogRef.afterClosed()
        //     .subscribe(result => {
        //         if (result) {
        //             console.log('The dialog was closed', result);
        //             // this.getList(this.route, this.filter);
        //         }
        //     }
        // );
    }

    public showFieldPlotsDialog(): void {
        console.log('should open field plot dialog');
        const dialogRef = this.dialog.open(FieldPlotDialogComponent, {
            width: '720px',
            data: { field: this.field }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    console.log('The dialog was closed', result);
                    this.getList(this.route, this.filter);
                }
            }
        );
    }

}
