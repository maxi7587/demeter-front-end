import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Field, FieldsService } from 'src/app/shared/services/fields.service';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.scss']
})
export class FieldEditComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('contactForm') public contact_form: ContactFormComponent;

    public field_form: FormGroup = new FormGroup({
        name: new FormControl(),
        active: new FormControl(true),
        manager: new FormControl(),
        details: new FormControl()
    });
    protected field: Field;

    public constructor(
        public profilesService: ProfilesService,
        public fieldsService: FieldsService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.field = this.activatedRoute.snapshot.data.field;
        for (let form_field in this.field_form.controls) {
            if (this.field.hasOwnProperty(form_field)) {
                this.field_form.controls[form_field].setValue(this.field[form_field]);
            }
        }
    }

    public ngOnInit() {
        if (this.field.id || this.field.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save']));
        } else {
            this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
        }
    }

    public updateForm(key, value) {
        console.log('key --->', key);
        console.log('value --->', value);
        this.field_form.controls[key].setValue(value);
        console.log(this.field_form.value);
    }

    public save() {
        this.contact_form.submit();
        this.field = { ...this.field, ...this.field_form.value };
        // TODO: update field contact data before saving
        console.log(this.field);
        this.fieldsService.save(this.field).subscribe(field => {
            console.log('field saved', field);
            this.field = field;
            console.log('this.field', this.field);
        });
    }

    public updateContact(contact: Contact) {
        this.field.contact = contact;
        console.log('updated field contact data?', this.field);
    }

}
