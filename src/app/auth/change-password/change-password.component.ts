import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePasswordService } from 'src/app/auth/change-password/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    public change_password_form: FormGroup = new FormGroup({
        new_password: new FormControl('', Validators.required),
        new_password_confirmation: new FormControl('', Validators.required)
    });

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private changePasswordService: ChangePasswordService,
        private usersService: UsersService
    ) { }

    public ngOnInit() {
    }

    public changePassword() {
      if (!this.change_password_form.valid) {
          return;
      }
      this.changePasswordService
          .changePassword(
              this.activatedRoute.snapshot.queryParams.email,
              this.activatedRoute.snapshot.queryParams.token,
              this.change_password_form.value.new_password,
              this.change_password_form.value.new_password_confirmation
          )
          .subscribe(
              () => {
                  this.router.navigate([`/auth`]);
              }
          );
    }

}
