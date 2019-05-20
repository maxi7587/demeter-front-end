import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UsersService } from 'src/app/shared/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/auth/reset-password/reset-password.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    public reset_password_form: FormGroup = new FormGroup({
        email: new FormControl('', Validators.required)
    });

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private matSnackBar: MatSnackBar,
        private resetPasswordService: ResetPasswordService,
        private usersService: UsersService
    ) { }

    public ngOnInit() {
    }

    public changePassword() {
      if (!this.reset_password_form.valid) {
          return;
      }
      this.resetPasswordService
          .resetPassword(
              this.reset_password_form.value.email,
          )
          .subscribe(
              response => {
                  this.router.navigate(['/auth']);
                  let snack_bar = this.matSnackBar.open(
                      response.detail,
                      'Close',
                      { duration: 10000, verticalPosition: 'bottom', horizontalPosition: 'center' }
                  );
                  snack_bar.onAction().subscribe(() => snack_bar.dismiss());
              }
          );
    }
}
