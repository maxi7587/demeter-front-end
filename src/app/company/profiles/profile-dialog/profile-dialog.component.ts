import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Profile } from 'src/app/shared/services/profiles.service';
import { ProfileFormComponent } from 'src/app/company/profiles/profile-form/profile-form.component';
import { Field } from 'src/app/shared/services/fields.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-profile-dialog',
    templateUrl: './profile-dialog.component.html',
    styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent {
    @ViewChild('profileForm') public profile_form: ProfileFormComponent;

    public constructor(
        public dialogRef: MatDialogRef<ProfileDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { field: Field; profile: Profile }
    ) {
        console.log('data in profile-dialog --->', this.data);
    }

    public save(): void {
        this.profile_form.save().subscribe(
            profile => {
                console.log('saved profile --->', profile);
                this.dialogRef.close(profile);
            }
        );
    }
}
