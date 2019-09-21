import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { AppResponsiveActionsComponent } from 'src/app/shared/app-responsive-actions/app-responsive-actions.component';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { ChargeDialogComponent } from 'src/app/company/charges/charge-dialog/charge-dialog.component';
import { ChargesService, Charge } from 'src/app/shared/services/charges.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss']
})
export class ChargesComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('responsiveActions') public responsiveActions: AppResponsiveActionsComponent;

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: string;
    @Input() public overrideRowClick: boolean;
    @Output() public rowClick: EventEmitter<Charge> = new EventEmitter();
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

    public actions_model: Array<ResponsiveAction> = ChargesService.actions_model;

    private _charges: {[key: string]: any} = {};
    set charges(charges: {[key: string]: any}) { this._charges = charges; }
    get charges(): {[key: string]: any} { return this._charges; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        public chargesService: ChargesService,
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

        this.filters_form.valueChanges
            .subscribe(
                filters => {
                    this.getList(filters);
                }
            );
    }

    public getList(filter) {
        this.chargesService
            // .all(undefined, undefined, 'name=&name__in=&name__startswith=&assigned_worker=7&assigned_worker__id=').subscribe(charges => {
            .all(undefined, undefined, filter).subscribe(charges => {
                this.charges = charges;
                // TODO: uncomment following for loop for desktop
                // for (let key of Object.keys(charges.results[0])) {
                //     if (['id', 'url'].indexOf(key) === -1) {
                //         this.columns.push(new Column(key, key));
                //     }
                // }
            });
    }

    public actionClick(action_key) {
        this[action_key]();
    }

    public goToElement(element) {
        if (this.overrideRowClick) {
            this.rowClick.emit(element);

            return;
        }

        this.router.navigate([this.router.url, element.id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

    public createElement() {
        if (this.createFromDialog) {
            // this.createButton.emit(new Charge());
            this.createChargeDialog();

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public createChargeDialog(): void {
        const dialogRef = this.matDialog.open(ChargeDialogComponent, {
            width: '360px',
            data: {}
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    this.getList(this.filters_form.value);
                }
            }
        );
    }

}
