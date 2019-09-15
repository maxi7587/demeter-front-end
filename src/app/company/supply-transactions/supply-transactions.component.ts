import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Field } from 'src/app/shared/services/fields.service';
import {
    SupplyTransactionDialogComponent
} from 'src/app/company/supply-transactions/supply-transaction-dialog/supply-transaction-dialog.component';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Supply, SuppliesService } from 'src/app/shared/services/supplies.service';
import { SupplyTransactionsService, SupplyTransaction } from 'src/app/shared/services/supply-transactions.service';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-supply-transactions',
  templateUrl: './supply-transactions.component.html',
  styleUrls: ['./supply-transactions.component.scss']
})
export class SupplyTransactionsComponent extends CompanyTemplateComponent implements OnInit {

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: string;
    @Input() public field: Field;
    @Input() public supply: Supply;
    @Input() public overrideRowClick: boolean;
    @Input() public showTabGroup = true;
    @Output() public rowClick: EventEmitter<SupplyTransaction> = new EventEmitter();
    // @Input() public overrideCreate: boolean;
    // @Output() public createButton: EventEmitter<SupplyTransaction> = new EventEmitter();
    @Input() public createFromDialog: boolean;

    public status_options: Array<{[key: string]: string}> = [
        {name: 'all', value: undefined},
        {name: 'confirmed', value: 'confirmed'},
        {name: 'draft', value: 'draft'},
        {name: 'error', value: 'error'}
    ];
    public filters_form: FormGroup = new FormGroup({
        status: new FormControl(this.status_options[0].value),
        supply: new FormControl()
    });
    public supplies: DRFCollection<Supply>;

    private _supply_transactions: {[key: string]: any} = {};
    set supply_transactions(supply_transactions: {[key: string]: any}) { this._supply_transactions = supply_transactions; }
    get supply_transactions(): {[key: string]: any} { return this._supply_transactions; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        private suppliesService: SuppliesService,
        private supplyTransactionsService: SupplyTransactionsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
    }

    public ngOnInit() {
        this.getList(this.filter);
        this.suppliesService.all()
            .subscribe(
                (supplies: DRFCollection<Supply>) => {
                    console.log(supplies);
                    this.supplies = supplies;
                }
            );

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

    public getList(filter) {
        this.supplyTransactionsService
            .all(undefined, undefined, filter).subscribe(supply_transactions => {
                this.supply_transactions = supply_transactions;
                // TODO: uncomment following for loop for desktop
                // for (let key of Object.keys(supply_transactions.results[0])) {
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
    //         this.createButton.emit(new SupplyTransaction());
    //
    //         return;
    //     }
    //     this.router.navigate([this.router.url, '0']);
    // }

    public createInputTransaction() {
        this.createElement('input');
    }

    public createOutputTransaction() {
        this.createElement('output');
    }

    public createElement(type: 'input'|'output') {
        if (this.createFromDialog) {
            // this.createButton.emit(new SupplyTransaction());
            this.createSupplyTransactionDialog(type);

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public createSupplyTransactionDialog(type): void {
        console.log('should open field plot dialog');
        const dialogRef = this.matDialog.open(SupplyTransactionDialogComponent, {
            width: '720px',
            data: {
                field: this.field,
                supply: this.supply,
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
