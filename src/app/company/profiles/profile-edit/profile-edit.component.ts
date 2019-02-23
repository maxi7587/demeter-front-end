import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { ContractTypesService, ContractType } from 'src/app/shared/services/contract-types.service';
import { ChargesService, Charge } from 'src/app/shared/services/charges.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company, CompaniesService } from 'src/app/shared/services/companies.service';
import { Profile, ProfilesService } from 'src/app/shared/services/profiles.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { RolesService, Role } from 'src/app/shared/services/roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('contactForm') public contact_form: ContactFormComponent;

    public profile_form: FormGroup = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        cuit: new FormControl(),
        birth_date: new FormControl(),
        company: new FormControl(null, [Validators.required]),
        role: new FormControl(null, [Validators.required]),
        charge: new FormControl(),
        contract_type: new FormControl(),
        daily_working_hours: new FormControl(),
        is_user: new FormControl()
    });

    public company: Company;
    public roles: DRFCollection<Role>;
    public charges: DRFCollection<Charge>;
    public contract_types: DRFCollection<ContractType>;

    protected profile: Profile;

    public constructor(
        protected router: Router,
        protected profilesService: ProfilesService,
        protected companiesService: CompaniesService,
        protected rolesService: RolesService,
        protected chargesService: ChargesService,
        protected contractTypesService: ContractTypesService,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, activatedRoute, navigationService);
        this.profile = this.activatedRoute.snapshot.data.profile;
        for (let form_field in this.profile_form.controls) {
            if (this.profile[form_field]) {
                this.profile_form.controls[form_field].setValue(this.profile[form_field]);
            }
        }
    }

    public ngOnInit() {
        console.log('this.company --->', this.company);
        this.rolesService
            .all()
            .subscribe(roles => {
                this.roles = roles;
            });
        this.chargesService
            .all()
            .subscribe(charges => {
                this.charges = charges;
            });
        this.contractTypesService
            .all()
            .subscribe(contract_types => {
                this.contract_types = contract_types;
            });
        if (!this.profile.id || this.profile.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save']));
        } else {
            this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
        }
    }

    public getFormattedBirthDate(date: string): string {
        console.log('date ------->', date);
        if (!date) { return; }
        let day = new Date(date).getDate();
        let month = new Date(date).getMonth();
        let year = new Date(date).getFullYear();
        let birth_date = [year, month, day].join('-');

        return birth_date;
    }

    public save() {
        this.contact_form.submit();
        let birth_date = this.getFormattedBirthDate(this.profile_form.controls.birth_date.value);
        console.log(this.profile_form);
        this.profile = {
            ...this.profile,
            ...this.profile_form.value,
            ...{ company: this.companiesService.company },
            ...{ birth_date: birth_date }
        };
        console.log('will save this profile --->', this.profile);
        console.log('will save this with this contact email data --->', this.profile.contact.web.email);
        this.profilesService.save(this.profile).subscribe(profile => {
            console.log('profile saved', profile);
            this.profile = profile;
            console.log('this.profile', this.profile);
        });
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateContact(contact: Contact) {
        this.profile.contact = contact;
    }

}
