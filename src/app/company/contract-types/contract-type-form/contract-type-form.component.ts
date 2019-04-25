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
import { ContractType, ContractTypesService } from 'src/app/shared/services/contract-types.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contract-type-form',
  templateUrl: './contract-type-form.component.html',
  styleUrls: ['./contract-type-form.component.scss']
})
export class ContractTypeFormComponent implements OnInit {
    @Input() public contract_type: ContractType = new ContractType();
    public contract_type_form: FormGroup = new FormGroup({
        name: new FormControl()
    });
    // protected me: Profile;

    public constructor(
        public contractTypesService: ContractTypesService,
        public companiesService: CompaniesService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        console.log('recieved contract_type --->', this.contract_type);
        for (let form_field in this.contract_type_form.controls) {
            if (this.contract_type[form_field]) {
                this.contract_type_form.controls[form_field].setValue(this.contract_type[form_field]);
            }
        }
    }

    public ngOnInit() {
        // IMPORTANT: have to update manually both values because it uses DRFCollectionAutocomplete
        console.log(this.contract_type_form.value);
        this.contract_type.company = this.contract_type.company || this.companiesService.company;
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.contract_type_form.controls[key].setValue(value);
    }

    public save(): Observable<ContractType> {
        console.log('contract_type --------------------------------->', this.contract_type_form.value);
        this.contract_type = { ...this.contract_type, ...this.contract_type_form.value };
        // this.contract_type.created_by = ;
        // TODO: update contract_type contact data before saving
        // console.log('me ----------->', this.me);
        // this.contract_type.created_by = this.me;
        return (<Observable<ContractType>>this.contractTypesService.save(this.contract_type));
        // .subscribe((contract_type: ContractType) => {
        //     console.log('contract_type saved', contract_type);
        //     this.contract_type = contract_type;
        //     console.log('this.contract_type', this.contract_type);
        // });
    }

}
