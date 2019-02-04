import { Component, OnInit } from '@angular/core';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from 'src/app/shared/services/fields.service';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.scss']
})
export class FieldEditComponent extends CompanyTemplateComponent implements OnInit {

    public field_form: FormGroup = new FormGroup({
        name: new FormControl(),
        company: new FormControl(),
        manager: new FormControl(),
        details: new FormControl(),
        contact: new FormControl(),
        active: new FormControl()
    });
    protected field: Field;


    public constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, navigationService);
        this.field = this.activatedRoute.snapshot.data.field;
        for (let form_field in this.field_form.controls) {
            if (this.field[form_field]) {
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

}
