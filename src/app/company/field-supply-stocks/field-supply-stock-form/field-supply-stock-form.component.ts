import { Component, ViewChild, ChangeDetectorRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeasureUnit, MeasureUnitsService } from 'src/app/shared/services/measure-units.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { FieldSupplyStock, FieldSupplyStocksService } from 'src/app/shared/services/field-supply-stocks.service';
import { Company } from 'src/app/shared/services/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-field-supply-stock-form',
    templateUrl: './field-supply-stock-form.component.html',
    styleUrls: ['./field-supply-stock-form.component.scss']
})
export class FieldSupplyStockFormComponent implements OnInit {
    @ViewChild('updateRelatedUser') public updateRelatedUser: MatCheckbox;
    @Input() public field_supply_stock: FieldSupplyStock;
    @Input() public field: Field;

    public field_supply_stock_form: FormGroup = new FormGroup({
        supply: new FormControl({value: null, disabled: true}, [Validators.required]),
        field: new FormControl({value: null, disabled: true}, [Validators.required]),
        actual_stock: new FormControl(),
        pending_stock: new FormControl(),
        desired_stock: new FormControl(),
    });

    public company: Company;
    public fields: DRFCollection<Field>;

    public constructor(
        protected router: Router,
        protected changeDetectorRef: ChangeDetectorRef,
        protected fieldSupplyStocksService: FieldSupplyStocksService,
        protected companiesService: CompaniesService,
        protected fieldsService: FieldsService,
        protected measureUnitsService: MeasureUnitsService,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        let company_id = companiesService.getCompanyIdFromURL();
        if (company_id) {
            companiesService.getAndSetCompanyFromId(company_id)
                .subscribe(
                    company => this.field_supply_stock_form.controls.company.setValue(company)
                );
        }
        let field_id = fieldsService.getFieldIdFromURL();
        if (field_id) {
            fieldsService.get(field_id).subscribe(
                field => this.field_supply_stock_form.controls.field.setValue(field)
            );
        }
    }

    public ngOnInit() {
        // IMPORTANT: have to seet both fields manually
        console.log('field in field_supply_stock-form ng on init --->', this.field);
        if (this.field) {
            // this.field_supply_stock.field = this.field_supply_stock.field || this.field;
            this.field_supply_stock_form.controls.field.setValue(this.field);
        }
        this.fieldsService
            .all()
            .subscribe((fields: DRFCollection<Field>) => {
                this.fields = fields;
            });
        if (!this.field_supply_stock && this.activatedRoute.snapshot.params.objectId) {
            this.fieldSupplyStocksService.get(this.activatedRoute.snapshot.params.objectId)
                .subscribe(
                    (field_supply_stock: FieldSupplyStock) => {
                        this.field_supply_stock = field_supply_stock;
                        this.fillFormData(this.field_supply_stock);
                    }
                );
        } else if (!this.field_supply_stock && !this.activatedRoute.snapshot.params.objectId) {
            this.fillFormData(new FieldSupplyStock());
        } else {
            this.fillFormData(this.field_supply_stock);
        }

        console.log('field_supply_stock_form VALUE --->', this.field_supply_stock_form.value);
        this.changeDetectorRef.detectChanges();
    }

    public fillFormData(data: FieldSupplyStock) {
        for (let form_field in this.field_supply_stock_form.controls) {
            if (this.field_supply_stock.hasOwnProperty(form_field)) {
                this.field_supply_stock_form.controls[form_field].setValue(this.field_supply_stock[form_field]);
            }
        }
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.field_supply_stock_form.controls[key].setValue(value);
    }

    public save(): Observable<FieldSupplyStock> {
        console.log('field_supply_stock_form ----->', this.field_supply_stock_form);
        this.field_supply_stock = {
            ...this.field_supply_stock,
            ...this.field_supply_stock_form.value,
            ...{ company: this.companiesService.company }
        };
        console.log('will save this field_supply_stock --->', this.field_supply_stock);

        return <Observable<FieldSupplyStock>>this.fieldSupplyStocksService.save(this.field_supply_stock);
    }

}
