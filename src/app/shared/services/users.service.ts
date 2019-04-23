import { Injectable } from '@angular/core';
import { BasicDRFService, DRFResource } from 'src/app/shared/basic-drf.service';
import { map } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';

export class User extends DRFResource {
    public id: string;
    public username: string;
    public password: string;
    public email: string;
    public first_name: string;
    public last_name: string;
    public is_staff: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BasicDRFService<User> {
    public resource = User;
    public user: User;
    protected _type = 'users';
    public getUser(): Observable<User> {
        if (this.user) {
            return observableOf(this.user);
        } else {
            return this.get('me')
                .pipe(
                    map(
                        user => {
                            console.log('user ---------------->', user);
                            // this.user = (<User>users.results[0]);
                            this.user = (<User>user);
                            return this.user;
                        }
                    )
                );
        }
    }
}
