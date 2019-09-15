import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ReceiptDialogComponent } from 'src/app/company/receipts/receipt-dialog/receipt-dialog.component';
import {
    SupplyTransactionDialogComponent
} from 'src/app/company/supply-transactions/supply-transaction-dialog/supply-transaction-dialog.component';
import {
    FieldSupplyStockDialogComponent
} from 'src/app/company/field-supply-stocks/field-supply-stock-dialog/field-supply-stock-dialog.component';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldSupplyStocksService, FieldSupplyStock } from 'src/app/shared/services/field-supply-stocks.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { Field } from 'src/app/shared/services/fields.service';
import { Task } from 'src/app/shared/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-field-supply-stocks',
    templateUrl: './field-supply-stocks.component.html',
    styleUrls: ['./field-supply-stocks.component.scss']
})
export class FieldSupplyStocksComponent extends CompanyTemplateComponent implements OnInit, AfterViewInit {
    @Input() public field: Field;
    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: {[key: string]: string};
    @Input() public overrideRowClick: boolean;
    @Input() public showInDialog: boolean;
    @Output() public rowClick: EventEmitter<Task> = new EventEmitter();
    @Output() public createdSupplyTransaction: EventEmitter<any> = new EventEmitter();
    @Output() public createdReceipt: EventEmitter<any> = new EventEmitter();
    // @Input() public overrideCreate: boolean;
    // @Output() public createButton: EventEmitter<Task> = new EventEmitter();
    @Input() public createFromDialog: boolean;
    @ViewChild('nameTemplate') public name_template: TemplateRef<any>;

    private _field_supply_stocks: {[key: string]: any} = {};
    set field_supply_stocks(field_supply_stocks: {[key: string]: any}) { this._field_supply_stocks = field_supply_stocks; }
    get field_supply_stocks(): {[key: string]: any} { return this._field_supply_stocks; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        private fieldSupplyStocksService: FieldSupplyStocksService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
    }

    public ngOnInit() {
        this.getList(this.filter);
    }

    public ngAfterViewInit() {
        // TODO: improve for mobile
        // this.columns.push(new Column('first_name', 'first_name', 'first_name').setTemplate(this.name_template));
        this.columns.push(new Column('name', 'name').setTemplate(this.name_template));
        this.columns.push(new Column('actual_stock', 'actual_stock', '', ''));
        this.columns.push(new Column('pending_stock', 'pending_stock', '', ''));
        this.columns.push(new Column('desired_stock', 'desired_stock', '', '', 'end center'));
    }

    public goToElement(element: FieldSupplyStock) {
        if (this.showInDialog) {
            this.showFieldSupplyStockDialog(element);

            return;
        }
        this.router.navigate([this.router.url, element.id]);
    }

    public getList(filter) {
        this.fieldSupplyStocksService.all(undefined, undefined, filter).subscribe(field_supply_stocks => {
            console.log('field_supply_stocks ------------------->', field_supply_stocks);
            this.field_supply_stocks = field_supply_stocks;
            // TODO: uncomment following for loop for desktop
            // for (let key of Object.keys(field_supply_stocks.results[0])) {
            //     if (['id', 'url'].indexOf(key) === -1) {
            //         this.columns.push(new Column(key, key));
            //     }
            // }
        });
    }

    // public add() {
    //     console.log('--------------------------');
    //     console.log('inside field_supply_stocks add method');
    //     console.log('--------------------------');
    //     this.createElement();
    // }

    public createElement() {
        console.log('--------------------------');
        console.log('inside field_supply_stocks createElement method');
        console.log('--------------------------');
        if (this.createFromDialog) {
            this.showFieldSupplyStockDialog();

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public showFieldSupplyStockDialog(field_supply_stock?: FieldSupplyStock): void {
        let dialog_data: {field_supply_stock: FieldSupplyStock; field: Field} = {
            field_supply_stock: field_supply_stock ? field_supply_stock : new FieldSupplyStock(),
            field: this.field
        };
        console.log('should open field_supply_stocks dialog');
        const dialogRef = this.matDialog.open(FieldSupplyStockDialogComponent, {
            width: '720px',
            data: dialog_data
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    console.log('The dialog was closed', result);
                    this.getList(this.filter);
                }
            }
        );
    }

    public createInputTransaction() {
        this.createSupplyTransactionDialog('input');
    }

    public createOutputTransaction() {
        this.createSupplyTransactionDialog('output');
    }

    private createSupplyTransactionDialog(type): void {
        console.log('should open field plot dialog');
        const dialogRef = this.matDialog.open(SupplyTransactionDialogComponent, {
            width: '720px',
            data: {
                field: this.field,
                type: type
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    console.log('The dialog was closed', result);
                    this.getList(this.filter);
                    this.createdSupplyTransaction.emit();
                }
            }
        );
    }

    public createInputReceipt() {
        this.createReceiptDialog('input');
    }

    public createOutputReceipt() {
        this.createReceiptDialog('output');
    }

    private createReceiptDialog(type): void {
        console.log('should open receipt dialog');
        const dialogRef = this.matDialog.open(ReceiptDialogComponent, {
            width: '720px',
            data: {
                field: this.field,
                type: type
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result) {
                    console.log('The dialog was closed', result);
                    this.getList(this.filter);
                    this.createdReceipt.emit();
                }
            }
        );
    }

}
