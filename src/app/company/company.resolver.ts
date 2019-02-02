import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UsersService, User } from 'src/app/shared/services/users.service';

@Injectable()
export class CompanyResolver implements Resolve<Observable<User>> {
    public constructor(public usersService: UsersService) {}

    public resolve() {
        return this.usersService.getUser();
        // return observableOf('Hello Alligator!').pipe(delay(2000));
    }
}
