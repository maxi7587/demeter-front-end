import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ContractTypeDialogComponent } from 'src/app/company/contract-types/contract-type-dialog/contract-type-dialog.component';
import { ContractTypesService, ContractType } from 'src/app/shared/services/contract-types.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Column } from 'src/app/shared/table/table-elements';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contract-types',
  templateUrl: './contract-types.component.html',
  styleUrls: ['./contract-types.component.scss']
})
export class ContractTypesComponent extends CompanyTemplateComponent implements OnInit {

    @Input() public showActions = true;
    @Input() public tableClasses: Array<string>;
    @Input() public filter: string;
    @Input() public overrideRowClick: boolean;
    @Output() public rowClick: EventEmitter<ContractType> = new EventEmitter();
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

    private _contract_types: {[key: string]: any} = {};
    set contract_types(contract_types: {[key: string]: any}) { this._contract_types = contract_types; }
    get contract_types(): {[key: string]: any} { return this._contract_types; }
    private _columns: Array<Column> = [];
    set columns(columns: Array<Column>) { this._columns = columns; }
    get columns(): Array<Column> { return this._columns; }

    public constructor(
        public matDialog: MatDialog,
        private contractTypesService: ContractTypesService,
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
        this.contractTypesService
            .all(undefined, undefined, filter).subscribe(contract_types => {
                this.contract_types = contract_types;
                // TODO: uncomment following for loop for desktop
                // for (let key of Object.keys(contract_types.results[0])) {
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

        this.router.navigate([this.router.url, element.id]);
        // this.router.navigate([profile_id.toString(), { relativeTo: this.activatedRoute }]);
    }

    public createElement() {
        if (this.createFromDialog) {
            // this.createButton.emit(new ContractType());
            this.createContractTypeDialog();

            return;
        }
        this.router.navigate([this.router.url, '0']);
    }

    public createContractTypeDialog(): void {
        console.log('should open contract types dialog');
        const dialogRef = this.matDialog.open(ContractTypeDialogComponent, {
            width: '360px',
            data: {}
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
