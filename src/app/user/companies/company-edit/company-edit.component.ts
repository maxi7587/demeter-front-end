import { Component, OnInit } from '@angular/core';
import { UserTemplateComponent } from 'src/app/user/user-template/user-template.component';
import { Company } from 'src/app/shared/services/companies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService, SidenavActions } from 'src/app/shared/navigation/navigation.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-company-edit',
    templateUrl: './company-edit.component.html',
    styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent extends UserTemplateComponent implements OnInit {
    public company_form: FormGroup = new FormGroup({
        name: new FormControl(),
        details: new FormControl(),
        contact: new FormControl()
    });
    public company: Company;

    public constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, navigationService);
        this.company = this.activatedRoute.snapshot.data.company;
        for (let form_field in this.company_form.controls) {
            if (this.company[form_field]) {
                this.company_form.controls[form_field].setValue(this.company[form_field]);
            }
        }
    }

    public ngOnInit() {
        if (this.company.id || this.company.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save']));
        } else {
            this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
        }
    }

}
