import { Injectable } from '@angular/core';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';
import { map } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';

export class User {
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
    public user: User;
    protected _type = 'users';
    public getUser(): Observable<User> {
        if (this.user) {
            return observableOf(this.user);
        } else {
            return this.all()
                .pipe(
                    map(
                        users => {
                            this.user = users.results[0];
                            return this.user;
                        }
                    )
                );
        }
    }
}
