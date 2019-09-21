import { Component, ViewChild, ChangeDetectorRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeasureUnit, MeasureUnitsService } from 'src/app/shared/services/measure-units.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { SuppliesService } from 'src/app/shared/services/supplies.service';
import { Supply } from 'src/app/shared/services/supplies.service';
import { Company } from 'src/app/shared/services/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-supply-form',
    templateUrl: './supply-form.component.html',
    styleUrls: ['./supply-form.component.scss']
})
export class SupplyFormComponent implements OnInit {
    @ViewChild('updateRelatedUser') public updateRelatedUser: MatCheckbox;
    @Input() public supply: Supply;
    @Input() public field: Field;

    public supply_form: FormGroup = new FormGroup({
        pinned: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        field: new FormControl(null, [Validators.required]),
        company: new FormControl(null, [Validators.required]), // this should not be in the form
        measure_unit: new FormControl(null, [Validators.required]),
        actual_stock: new FormControl(),
        pending_stock: new FormControl(),
        desired_stock: new FormControl(),
    });

    public company: Company;
    public fields: DRFCollection<Field>;
    public measure_units: DRFCollection<MeasureUnit>;

    public constructor(
        protected router: Router,
        protected changeDetectorRef: ChangeDetectorRef,
        protected suppliesService: SuppliesService,
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
                    company => this.supply_form.controls.company.setValue(company)
                );
        }
        let field_id = fieldsService.getFieldIdFromURL();
        if (field_id) {
            fieldsService.get(field_id).subscribe(
                field => this.supply_form.controls.field.setValue(field)
            );
        }
    }

    public ngOnInit() {
        // IMPORTANT: have to seet both fields manually
        console.log('field in supply-form ng on init --->', this.field);
        if (this.field) {
            // this.supply.field = this.supply.field || this.field;
            this.supply_form.controls.field.setValue(this.field);
        }
        this.fieldsService
            .all()
            .subscribe((fields: DRFCollection<Field>) => {
                this.fields = fields;
            });
        this.measureUnitsService
            .all(undefined, undefined, { page_size: 100 })
            .subscribe((measure_units: DRFCollection<MeasureUnit>) => {
                this.measure_units = measure_units;
            });
        if (!this.supply && this.activatedRoute.snapshot.params.objectId) {
            this.suppliesService.get(this.activatedRoute.snapshot.params.objectId)
                .subscribe(
                    (supply: Supply) => {
                        this.supply = supply;
                        this.fillFormData(this.supply);
                    }
                );
        } else if (!this.supply && !this.activatedRoute.snapshot.params.objectId) {
            this.fillFormData(new Supply());
        } else {
            this.fillFormData(this.supply);
        }

        console.log('supply_form VALUE --->', this.supply_form.value);
        this.changeDetectorRef.detectChanges();
    }

    public fillFormData(data: Supply) {
        for (let form_field in this.supply_form.controls) {
            if (this.supply.hasOwnProperty(form_field)) {
                this.supply_form.controls[form_field].setValue(this.supply[form_field]);
            }
        }
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.supply_form.controls[key].setValue(value);
    }

    public save(): Observable<Supply> {
        console.log('supply_form ----->', this.supply_form);
        this.supply = {
            ...this.supply,
            ...this.supply_form.value,
            ...{ company: this.companiesService.company }
        };
        console.log('will save this supply --->', this.supply);

        return <Observable<Supply>>this.suppliesService.save(this.supply);
    }

}
