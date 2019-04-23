import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldPlotFormComponent } from 'src/app/company/field-plots/field-plot-form/field-plot-form.component';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
import { MeasureUnit, MeasureUnitsService } from 'src/app/shared/services/measure-units.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Field, FieldsService } from 'src/app/shared/services/fields.service';

@Component({
  selector: 'app-field-plot-edit',
  templateUrl: './field-plots-edit.component.html',
  styleUrls: ['./field-plots-edit.component.scss']
})
export class FieldPlotEditComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('fieldPlotForm') public field_plot_form: FieldPlotFormComponent;

    // public measure_units: DRFCollection<MeasureUnit>;

    // public field_form: FormGroup = new FormGroup({
    //     name: new FormControl(),
    //     active: new FormControl(true),
    //     manager: new FormControl(),
    //     total_area: new FormControl(),
    //     measure_unit: new FormControl(),
    //     details: new FormControl()
    // });
    // protected field: Field;

    public constructor(
        public profilesService: ProfilesService,
        public fieldsService: FieldsService,
        protected measureUnitsService: MeasureUnitsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        console.log('-------------- inside Field plot Edit component --------------');
        // this.field = this.activatedRoute.snapshot.data.field;
        // for (let form_field in this.field_form.controls) {
        //     if (this.field.hasOwnProperty(form_field)) {
        //         this.field_form.controls[form_field].setValue(this.field[form_field]);
        //     }
        // }
    }

    // public ngOnInit() {
    //     if (this.field.id || this.field.id === '0') {
    //         this.navigationService.actions.next(new SidenavActions(['save']));
    //     } else {
    //         this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
    //     }
    //
    //     this.measureUnitsService
    //         .all(undefined, undefined, { quantity_type: 'area' })
    //         .subscribe(
    //             measure_units => this.measure_units = measure_units
    //         );
    // }
    //
    // public updateForm(key, value) {
    //     console.log('key --->', key);
    //     console.log('value --->', value);
    //     this.field_form.controls[key].setValue(value);
    //     console.log(this.field_form.value);
    // }
    //
    // public save() {
    //     this.contact_form.submit();
    //     this.field = { ...this.field, ...this.field_form.value };
    //     // TODO: update field contact data before saving
    //     console.log(this.field);
    //     this.fieldsService.save(this.field).subscribe(field => {
    //         console.log('field saved', field);
    //         this.field = field;
    //         console.log('this.field', this.field);
    //     });
    // }
    //
    // public updateContact(contact: Contact) {
    //     this.field.contact = contact;
    //     console.log('updated field contact data?', this.field);
    // }

    public save() {
        this.field_plot_form.save();
    }

}
