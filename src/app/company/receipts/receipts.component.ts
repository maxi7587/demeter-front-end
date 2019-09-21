import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppResponsiveActionsComponent } from 'src/app/shared/app-responsive-actions/app-responsive-actions.component';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Field } from 'src/app/shared/services/fields.service';
import {
    ReceiptDialogComponent
} from 'src/app/company/receipts/receipt-dialog/receipt-dialog.component';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptsService, Receipt } from 'src/app/shared/services/receipts.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('responsiveActions') public responsiveActions: AppResponsiveActionsComponent;
    public actions_model: Array<ResponsiveAction> = ReceiptsService.actions_model;

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: string;
    @Input() public field: Field;
    @Input() public overrideRowClick: boolean;
    @Input() public showTabGroup = true;
    @Output() public rowClick: EventEmitter<Receipt> = new EventEmitter();
    // @Input() public overrideCreate: boolean;
    // @Output() public createButton: EventEmitter<Receipt> = new EventEmitter();
    @Input() public createFromDialog = true;

    public status_options: Array<{[key: string]: string}> = [
        {name: 'all', value: undefined},
        {name: 'confirmed', value: 'confirmed'},
        {name: 'draft', value: 'draft'},
        {name: 'error', value: 'error'}
    ];
    public filters_form: FormGroup = new FormGroup({
        status: new FormControl(this.status_options[0].value)
    });

    private _receipts: {[key: string]: any} = {};
    set receipts(receipts: {[key: string]: any}) { this._receipts = receipts; }
    get receipts(): {[key: string]: any} { return this._receipts; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        private receiptsService: ReceiptsService,
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
        this.columns.push(new Column('document_id', 'document_id'));
        this.columns.push(new Column('date', 'date'));
        this.columns.push(new Column('field.name', 'field', '', '', 'end center'));

        this.filters_form.valueChanges
            .subscribe(
                filters => {
                    this.getList(filters);
                }
            );
    }

    public actionClick(action_key) {
        this[action_key]();
    }

    public getList(filter) {
        this.receiptsService
            .all(undefined, undefined, filter).subscribe(receipts => {
                this.receipts = receipts;
                // TODO: uncomment following for loop for desktop
                // for (let key of Object.keys(receipts.results[0])) {
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

        this.createReceiptDialog(element.type, element);

        // this.router.navigate([this.router.url, element.id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

    // public createElement() {
    //     if (this.overrideCreate) {
    //         this.createButton.emit(new Receipt());
    //
    //         return;
    //     }
    //     this.router.navigate([this.router.url, '0']);
    // }

    public createInputReceipt() {
        this.createElement('input');
    }

    public createOutputReceipt() {
        this.createElement('output');
    }

    public createElement(type: 'input'|'output') {
        if (this.createFromDialog) {
            // this.createButton.emit(new Receipt());
            this.createReceiptDialog(type);

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public createReceiptDialog(type, receipt?): void {
        console.log('should open field plot dialog');
        const dialogRef = this.matDialog.open(ReceiptDialogComponent, {
            width: '720px',
            data: {
                receipt: receipt,
                field: this.field,
                type: type
            }
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
