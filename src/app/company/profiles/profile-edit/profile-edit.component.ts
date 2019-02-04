import { Component, OnInit } from '@angular/core';
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
    public profile_form: FormGroup = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        daily_working_hours: new FormControl('', [Validators.required]),
        contact: new FormControl(),
        is_user: new FormControl()
    });

    protected profile: Profile;

    public company: Company;
    public roles: DRFCollection<Role>;

    public constructor(
        protected router: Router,
        protected profilesService: ProfilesService,
        protected companiesService: CompaniesService,
        protected rolesService: RolesService,
        protected activatedRoute: ActivatedRoute,
        protected navigationService: NavigationService
    ) {
        super(router, navigationService);
        this.profile = this.activatedRoute.snapshot.data.profile;
        for (let form_field in this.profile_form.controls) {
            if (this.profile[form_field]) {
                this.profile_form.controls[form_field].setValue(this.profile[form_field]);
            }
        }
    }

    public ngOnInit() {
        this.company = this.companiesService.company;
        this.rolesService
            .all()
            .subscribe(roles => {
                this.roles = roles;
            });
        if (!this.profile.id || this.profile.id === '0') {
            this.navigationService.actions.next(new SidenavActions(['save']));
        } else {
            this.navigationService.actions.next(new SidenavActions(['delete', 'save']));
        }
    }

    public save() {
        this.profile = { ...this.profile, ...this.profile_form.value };
        this.profilesService.post(this.profile).subscribe(profile => console.log('profile saved', profile));
    }

    public compareById(f1: any, f2: any) {
        return f1 && f2 && f1.id === f2.id;
    }

}
