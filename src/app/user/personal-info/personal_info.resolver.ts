import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UsersService, User } from 'src/app/shared/services/users.service';

@Injectable()
export class PersonalInfoResolver implements Resolve<Observable<User>> {
    public constructor(protected usersService: UsersService) {}

    public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        return this.usersService.getUser();
    }
}
