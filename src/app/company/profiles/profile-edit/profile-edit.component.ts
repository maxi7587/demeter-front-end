import { Component, OnInit, ViewChild, ComponentRef } from '@angular/core';
import { User } from 'src/app/shared/services/users.service';
import { TasksComponent } from 'src/app/company/tasks/tasks.component';
import { FieldsService, Field } from 'src/app/shared/services/fields.service';
import { ContactFormComponent } from 'src/app/shared/components/contact-form/contact-form.component';
import { Contact } from 'src/app/shared/services/contacts/contacts.service';
import { ContractTypesService, ContractType } from 'src/app/shared/services/contract-types.service';
import { ChargesService, Charge } from 'src/app/shared/services/charges.service';
import { CompanyTemplateComponent } from 'src/app/company/company-template/company-template.component';
import { SidenavActions, NavigationService } from 'src/app/shared/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company, CompaniesService } from 'src/app/shared/services/companies.service';
import { Profile, ProfilesService } from 'src/app/shared/services/profiles.service';
import { Task } from 'src/app/shared/services/tasks.service';
import { DRFCollection } from 'src/app/shared/basic-drf.service';
import { RolesService, Role } from 'src/app/shared/services/roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent extends CompanyTemplateComponent implements OnInit {
    @ViewChild('contactForm') public contact_form: ContactFormComponent;
    @ViewChild('tasks') public tasksComponent: TasksComponent;
    @ViewChild('tabGroup') public tabGroup: MatTabGroup;
    @ViewChild('updateRelatedUser') public updateRelatedUser: MatCheckbox;

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

    public tab_index = {
        0: 'profile',
        1: 'tasks'
    };


    public company: Company;
    public roles: DRFCollection<Role>;
    public fields: DRFCollection<Field>;
    public charges: DRFCollection<Charge>;
    public contract_types: DRFCollection<ContractType>;
    public profile: Profile;

    public constructor(
        protected router: Router,
        protected profilesService: ProfilesService,
        protected companiesService: CompaniesService,
        protected rolesService: RolesService,
        protected fieldsService: FieldsService,
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
        if (!this.profile.id || this.profile.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save', 'cancel']));
        } else {
            this.navigationService.actions.next(new SidenavActions(['cancel', 'delete', 'save']));
        }
    }

    public selectedTabChange(tab: MatTabChangeEvent) {
        console.log('tab changed -------------->', tab);
        let selected_tab = this.tab_index[tab.index];
        console.log('tab index changed -------------->', selected_tab);

        switch (selected_tab) {
            case 'profile':
                if (!this.profile.id || this.profile.id === '0') {
                    this.navigationService.actions.next(new SidenavActions(['save', 'cancel']));
                } else {
                    this.navigationService.actions.next(new SidenavActions(['cancel', 'delete', 'save']));
                }
                break;
            case 'tasks':
                this.navigationService.actions.next(new SidenavActions(['search', 'add']));
                break;
        }
    }

    public updateForm(key, value) {
        this.profile_form.controls[key].setValue(value);
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

    public add() {
        console.log(this.tabGroup.selectedIndex);
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'tasks':
                this.tasksComponent.createTaskDialog();
                break;
        }
    }

    public search(filter: string) {
        console.log('inside search method: ', filter);
        let selected_tab = this.tab_index[this.tabGroup.selectedIndex];

        switch (selected_tab) {
            case 'tasks':
                let tasks_filter = {
                    ...this.tasksComponent.filters_form.value,
                    ...{ name: filter }
                };
                console.log('this.tasksComponent.filters_form.value --->', this.tasksComponent.filters_form.value);
                console.log('filter --->', filter);
                console.log('tasks_filter --->', tasks_filter);
                this.tasksComponent.getList(tasks_filter);
                break;
        }
    }

    public save() {
        console.log('this.related_user_form.value ----->', this.updateRelatedUser);
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
        console.log('profile_form ----->', this.profile_form);
        this.profile = {
            ...this.profile,
            ...this.profile_form.value,
            ...{ company: this.companiesService.company },
            ...{ birth_date: birth_date }
        };
        console.log('will save this profile --->', this.profile);
        console.log('will save this with this contact email data --->', this.profile.contact.web.email);
        this.profilesService.save(this.profile).subscribe((profile: Profile) => {
            console.log('profile saved', profile);
            this.profile = profile;
            this.router.navigate(['..'], { relativeTo: this.activatedRoute });
            console.log('this.profile', this.profile);
        });
    }

    public goToTask(task: Task) {
        console.log(`will navigate to --->../../tasks/${task.id}`);

        this.router.navigate([`../../tasks/${task.id}`], { relativeTo: this.activatedRoute });
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

    public updateContact(contact: Contact) {
        this.profile.contact = contact;
    }

}
