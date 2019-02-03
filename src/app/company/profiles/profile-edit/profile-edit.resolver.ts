import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProfilesService, Profile } from 'src/app/shared/services/profiles.service';

@Injectable()
export class ProfileEditResolver implements Resolve<Observable<Profile>> {
    protected profile_id: string;

    public constructor(protected profilesService: ProfilesService) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        return this.profilesService.get(activatedRouteSnapshot.params.objectId);
    }
}
