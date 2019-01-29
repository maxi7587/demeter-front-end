import { Component, OnInit } from '@angular/core';
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
export class ProfileEditComponent implements OnInit {
    public profile_form: FormGroup = new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        role: new FormControl('', [Validators.required]),
        daily_working_hours: new FormControl('', [Validators.required]),
        contact: new FormControl(),
        is_user: new FormControl()
    });

    protected profile = new Profile();

    public company: Company;
    public roles: DRFCollection<Role>;

    public constructor(
        protected profilesService: ProfilesService,
        protected companiesService: CompaniesService,
        protected rolesService: RolesService
    ) { }

    public ngOnInit() {
        this.company = this.companiesService.company;
        console.log('company --->', this.company);
        this.rolesService
            .all()
            .subscribe(roles => {
                this.roles = roles;
                console.log('roles --->', this.roles.results);
            });
    }

    public save() {
        this.profile = { ...this.profile, ...this.profile_form.value };
        this.profilesService.post(this.profile).subscribe(profile => console.log('profile saved', profile));
        console.log('profile_form --->', this.profile);
    }

}
