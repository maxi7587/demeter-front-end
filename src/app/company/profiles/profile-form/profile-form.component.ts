import { Component, ViewChild, ChangeDetectorRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/services/users.service';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { NavigationService } from 'src/app/shared/navigation/navigation.service';
import { ContractTypesService, ContractType } from 'src/app/shared/services/contract-types.service';
import { ChargesService, Charge } from 'src/app/shared/services/charges.service';
import { RolesService, Role } from 'src/app/shared/services/roles.service';
import { ProfilesService } from 'src/app/shared/services/profiles.service';
import { Profile } from 'src/app/shared/services/profiles.service';
import { Company } from 'src/app/shared/services/companies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { Observable } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
    @ViewChild('contactForm') public contact_form: ContactFormComponent;
    @ViewChild('updateRelatedUser') public updateRelatedUser: MatCheckbox;
    @Input() public profile: Profile;
    @Input() public field: Field;

    public profile_form: FormGroup = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        cuit: new FormControl(),
        birth_date: new FormControl(),
        company: new FormControl(null, [Validators.required]),
        role: new FormControl(null, [Validators.required]),
        field: new FormControl(),
        charge: new FormControl(),
        contract_type: new FormControl(),
        pinned: new FormControl(),
        daily_working_hours: new FormControl()
    });

    public related_user_form: FormGroup = new FormGroup({
        // update_related_user: new FormControl(false, [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        repeat_password: new FormControl('', [Validators.required])
    });

    public company: Company;
    public roles: DRFCollection<Role>;
    public fields: DRFCollection<Field>;
    public charges: DRFCollection<Charge>;
    public contract_types: DRFCollection<ContractType>;

    public constructor(
        protected router: Router,
        protected changeDetectorRef: ChangeDetectorRef,
        protected profilesService: ProfilesService,
        protected companiesService: CompaniesService,
        protected rolesService: RolesService,
        protected fieldsService: FieldsService,
        protected chargesService: ChargesService,
        protected contractTypesService: ContractTypesService,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        let company_id = companiesService.getCompanyIdFromURL();
        if (company_id) {
            companiesService.getAndSetCompanyFromId(company_id)
                .subscribe(
                    company => this.profile_form.controls.company.setValue(company)
                );
        }
        let field_id = fieldsService.getFieldIdFromURL();
        if (field_id) {
            fieldsService.get(field_id).subscribe(
                field => this.profile_form.controls.field.setValue(field)
            );
        }
    }

    public ngOnInit() {
        // IMPORTANT: have to seet both fields manually
        console.log('field in profile-form ng on init --->', this.field);
        if (this.field) {
            // this.profile.field = this.profile.field || this.field;
            this.profile_form.controls.field.setValue(this.field);
        }
        this.rolesService
            .all()
            .subscribe((roles: DRFCollection<Role>) => {
                this.roles = roles;
            });
        this.fieldsService
            .all()
            .subscribe((fields: DRFCollection<Field>) => {
                this.fields = fields;
            });
        this.chargesService
            .all()
            .subscribe(charges => {
                this.charges = <DRFCollection<Charge>>charges;
            });
        this.contractTypesService
            .all()
            .subscribe(contract_types => {
                this.contract_types = <DRFCollection<ContractType>>contract_types;
            });
        if (!this.profile && this.activatedRoute.snapshot.params.objectId) {
            this.profilesService.get(this.activatedRoute.snapshot.params.objectId)
                .subscribe(
                    (profile: Profile) => {
                        this.profile = profile;
                        this.fillFormData(this.profile);
                    }
                );
        } else if (!this.profile && !this.activatedRoute.snapshot.params.objectId) {
            this.fillFormData(new Profile());
        } else {
            this.fillFormData(this.profile);
        }

        console.log('profile_form VALUE --->', this.profile_form.value);
        this.changeDetectorRef.detectChanges();
    }

    public fillFormData(data: Profile) {
        for (let form_field in this.profile_form.controls) {
            if (this.profile.hasOwnProperty(form_field)) {
                this.profile_form.controls[form_field].setValue(this.profile[form_field]);
            }
        }
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateForm(key, value) {
        this.profile_form.controls[key].setValue(value);
    }

    public updateContact(contact: Contact) {
        this.profile.contact = contact;
    }

    public getFormattedBirthDate(date: string): string {
        if (!date) { return; }
        let day = new Date(date).getDate();
        let month = new Date(date).getMonth();
        let year = new Date(date).getFullYear();
        let birth_date = [year, month, day].join('-');

        return birth_date;
    }

    public save(): Observable<Profile> {
        this.contact_form.submit();
        if (this.updateRelatedUser.checked) {
            if (this.related_user_form.value.password !== this.related_user_form.value.repeat_password) {
                console.log('AHOULD HANDLE THIS ERROR: PASS AND REPEAT PASS ARE NOT EQUAL');
            }
            console.log('will create related user ----->', this.related_user_form);
            let related_user = new User();
            related_user.username = this.related_user_form.value.username;
            related_user.password = this.related_user_form.value.password;
            related_user.email = this.profile.contact.web.email;
            related_user.first_name = this.profile_form.value.first_name;
            related_user.last_name = this.profile_form.value.last_name;
            related_user.is_staff = false;

            this.profile.user = related_user;
            console.log('this.profile.user ---->', this.profile.user);
        }
        let birth_date = this.getFormattedBirthDate(this.profile_form.controls.birth_date.value);
        this.profile_form.controls.birth_date.setValue(birth_date);
        console.log('profile_form ----->', this.profile_form);
        this.profile = {
            ...this.profile,
            ...this.profile_form.value,
            ...{ company: this.companiesService.company },
            ...{ birth_date: birth_date }
        };
        console.log('will save this profile --->', this.profile);
        console.log('will save this with this contact email data --->', this.profile.contact.web.email);

        return <Observable<Profile>>this.profilesService.save(this.profile);
    }

}
