import { Component, OnInit, Input } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';
import { User, UsersService } from 'src/app/shared/services/users.service';
import { FieldRowsService } from 'src/app/shared/services/field-rows.service';
import { FieldRow } from 'src/app/shared/services/field-rows.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Charge, ChargesService } from 'src/app/shared/services/charges.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.scss']
})
export class ChargeFormComponent implements OnInit {
    @Input() public charge: Charge = new Charge();
    public charge_form: FormGroup = new FormGroup({
        name: new FormControl()
    });
    // protected me: Profile;

    public constructor(
        public chargesService: ChargesService,
        public companiesService: CompaniesService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        console.log('recieved charge --->', this.charge);
        for (let form_field in this.charge_form.controls) {
            if (this.charge[form_field]) {
                this.charge_form.controls[form_field].setValue(this.charge[form_field]);
            }
        }
        this.charge.company = this.companiesService.company;
    }

    public ngOnInit() {
        // IMPORTANT: have to update manually both values because it uses DRFCollectionAutocomplete
        console.log(this.charge_form.value);
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.charge_form.controls[key].setValue(value);
    }

    public save(): Observable<Charge> {
        console.log('charge --------------------------------->', this.charge_form.value);
        this.charge = { ...this.charge, ...this.charge_form.value };
        // this.charge.created_by = ;
        // TODO: update charge contact data before saving
        // console.log('me ----------->', this.me);
        // this.charge.created_by = this.me;
        return (<Observable<Charge>>this.chargesService.save(this.charge));
        // .subscribe((charge: Charge) => {
        //     console.log('charge saved', charge);
        //     this.charge = charge;
        //     console.log('this.charge', this.charge);
        // });
    }

}
