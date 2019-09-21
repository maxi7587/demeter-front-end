import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { AppResponsiveActionsComponent } from 'src/app/shared/app-responsive-actions/app-responsive-actions.component';
import { ResponsiveAction } from 'src/app/shared/app-responsive-actions/responsive-actions-elements/responsive-action';
import { ReceiptDialogComponent } from 'src/app/company/receipts/receipt-dialog/receipt-dialog.component';
import {
    SupplyTransactionDialogComponent
} from 'src/app/company/supply-transactions/supply-transaction-dialog/supply-transaction-dialog.component';
import { SupplyDialogComponent } from 'src/app/company/supplies/supply-dialog/supply-dialog.component';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuppliesService, Supply } from 'src/app/shared/services/supplies.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { Field } from 'src/app/shared/services/fields.service';
import { Task } from 'src/app/shared/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-supplies',
    templateUrl: './supplies.component.html',
    styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent extends CompanyTemplateComponent implements OnInit, AfterViewInit {
    @ViewChild('responsiveActions') public responsiveActions: AppResponsiveActionsComponent;
    public actions_model: Array<ResponsiveAction> = SuppliesService.actions_model;

    @Input() public field: Field;
    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: {[key: string]: string};
    @Input() public overrideRowClick: boolean;
    @Input() public showInDialog = true;
    @Output() public rowClick: EventEmitter<Task> = new EventEmitter();
    @Output() public createdSupplyTransaction: EventEmitter<any> = new EventEmitter();
    @Output() public createdReceipt: EventEmitter<any> = new EventEmitter();
    // @Input() public overrideCreate: boolean;
    // @Output() public createButton: EventEmitter<Task> = new EventEmitter();
    @Input() public createFromDialog = true;


    private _supplies: {[key: string]: any} = {};
    set supplies(supplies: {[key: string]: any}) { this._supplies = supplies; }
    get supplies(): {[key: string]: any} { return this._supplies; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        private suppliesService: SuppliesService,
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
        this.columns.push(new Column('name', 'name'));
        this.columns.push(new Column('actual_stock', 'actual_stock', '', ''));
        this.columns.push(new Column('pending_stock', 'pending_stock', '', ''));
        this.columns.push(new Column('desired_stock', 'desired_stock', '', '', 'end center'));
    }

    public goToElement(element: Supply) {
        if (this.showInDialog) {
            this.showSupplyDialog(element);

            return;
        }
        this.router.navigate([this.router.url, element.id]);
    }

    public getList(filter) {
        this.suppliesService.all(undefined, undefined, filter).subscribe(supplies => {
            console.log('supplies ------------------->', supplies);
            this.supplies = supplies;
            // TODO: uncomment following for loop for desktop
            // for (let key of Object.keys(supplies.results[0])) {
            //     if (['id', 'url'].indexOf(key) === -1) {
            //         this.columns.push(new Column(key, key));
            //     }
            // }
        });
    }

    public actionClick(action_key) {
        this[action_key]();
    }

    // public add() {
    //     console.log('--------------------------');
    //     console.log('inside supplies add method');
    //     console.log('--------------------------');
    //     this.responsiveActions.openBottomSheet();
    //     // this.createElement();
    // }

    public createElement() {
        console.log('--------------------------');
        console.log('inside supplies createElement method');
        console.log('--------------------------');
        if (this.createFromDialog) {
            this.showSupplyDialog();

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public showSupplyDialog(supply?: Supply): void {
        let dialog_data: {supply: Supply; field: Field} = {
            supply: supply ? supply : new Supply(),
            field: this.field
        };
        console.log('should open supplies dialog');
        const dialogRef = this.matDialog.open(SupplyDialogComponent, {
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
