import { Injectable } from '@angular/core';
import { BasicDRFService } from 'src/app/shared/basic-drf.service';

export class User {
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
    protected _type = 'users';
}
