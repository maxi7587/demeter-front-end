import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { MeasureUnit, MeasureUnitsService } from 'src/app/shared/services/measure-units.service';
import { FieldPlot, FieldPlotsService } from 'src/app/shared/services/field-plots.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-field-plot-form',
    templateUrl: './field-plot-form.component.html',
    styleUrls: ['./field-plot-form.component.scss']
})
export class FieldPlotFormComponent implements OnInit {
    @Input() public field_plot: FieldPlot = new FieldPlot();
    @Input() public field: Field;
    @Input() public measure_units: DRFCollection<MeasureUnit>;

    public field_plot_form: FormGroup = new FormGroup({
        code: new FormControl(),
        label: new FormControl(),
        status: new FormControl(),
        area: new FormControl(),
        area_measure_unit: new FormControl(),
        field_rows_qty: new FormControl(),
        field_rows_distance: new FormControl(),
        field_rows_distance_measure_unit: new FormControl(),
        plants_distance: new FormControl(),
        plants_distance_measure_unit: new FormControl(),
        plantation_year: new FormControl(),
        plants_origin: new FormControl(),
        graft: new FormControl(),
        foot: new FormControl(),
        anit_hail_net: new FormControl(),
        irrigation: new FormControl(),
        conduction_system: new FormControl(),
        details: new FormControl(),
        field: new FormControl(),
        company: new FormControl()
    });

    public constructor(
        public companiesService: CompaniesService,
        public fieldsService: FieldsService,
        public fieldPlotsService: FieldPlotsService,
        public measureUnitsService: MeasureUnitsService,
        public activatedRoute: ActivatedRoute
    ) {
        let company_id = companiesService.getCompanyIdFromURL();
        if (company_id) {
            companiesService.getAndSetCompanyFromId(company_id)
                .subscribe(
                    company => this.field_plot_form.controls.company.setValue(company)
                );
        }
        let field_id = fieldsService.getFieldIdFromURL();
        if (field_id) {
            fieldsService.get(field_id).subscribe(
                field => this.field_plot_form.controls.field.setValue(field)
            );
        }
    }

    public ngOnInit() {
        // IMPORTANT: have to seet both fields manually
        if (this.field) {
            this.field_plot.field = this.field;
            this.field_plot_form.controls.field.setValue(this.field);
        }
        if (!this.field_plot) {
            this.fieldPlotsService.get(this.activatedRoute.snapshot.params.objectId)
                .subscribe(
                    (field_plot: FieldPlot) => {
                        this.field_plot = field_plot;
                        this.fillFormData(this.field_plot);
                    }
                );
        } else {
            this.fillFormData(this.field_plot);
        }
        console.log('--------------------------------------------------------------');
        console.log('measure_units ---->', this.measure_units);
        console.log('--------------------------------------------------------------');
        if (!this.measure_units) {
            this.measureUnitsService
                .all()
                .subscribe(
                    measure_units => {
                        this.measure_units = measure_units;
                        console.log('--------------------------------------------------------------');
                        console.log('measure_units --->', this.measure_units, measure_units);
                        console.log('--------------------------------------------------------------');
                    }
                );
        }
    }

    public fillFormData(data) {
        for (let form_field in this.field_plot_form.controls) {
            if (this.field_plot.hasOwnProperty(form_field)) {
                this.field_plot_form.controls[form_field].setValue(this.field_plot[form_field]);
            }
        }
    }

    public updateForm(key, value) {
        this.field_plot_form.controls[key].setValue(value);
    }

    public save(): Observable<FieldPlot> {
        console.log('saving field_plot_form --------->', this.field_plot_form);
        return <Observable<FieldPlot>>this.fieldPlotsService.save(this.field_plot_form.value);
    }

}
