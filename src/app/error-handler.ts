import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    public constructor(
        public ngZone: NgZone,
        public injector: Injector,
        public matSnackBar: MatSnackBar
    ) { }
    public handleError(error) {
        console.log('ERROR ----------------->', error);
        let router = this.injector.get(Router);
        if (error.error) {
            if (error.error.detail === 'Authentication credentials were not provided.') {
                this.ngZone.run(() => router.navigate(['/login']));
                    // .then(() => this.toastrService.error(error.error.detail));
            } else if (error.error.details) {
            } else if (typeof error.error === 'object' && error.error !== null && !(error.error instanceof Array)) {
                this.handleDRFErrors(error.error);
            }
        } else if (error.rejection && error.rejection.error && error.rejection.error.error_description) {
            this.showErrorInSnackBar(error.rejection.error.error_description);
        }
        // IMPORTANT: commented this cause it was hanging app
        // throw error;
    }

    public handleDRFErrors(error: {[key: string]: any}) {
        for (let error_key in error) {
            if (typeof(error[error_key]) === 'string') {
                this.showErrorInSnackBar(`${error_key}: ${error[error_key]}`);
            } else if (error[error_key] instanceof Array) {
                for (let each_error of error[error_key]) {
                    this.showErrorInSnackBar(`${error_key}: ${each_error}`);
                }
            } else if (
                typeof error.error === 'object' && error.error !== null
            ) {
                this.handleDRFErrors(error);
            }
        }
    }

    public showErrorInSnackBar(error_string: string) {
        this.ngZone.run(
            () => setTimeout(
                () => {
                    let snack_bar = this.matSnackBar.open(
                        error_string,
                        'Close',
                        { duration: 4000, verticalPosition: 'bottom', horizontalPosition: 'center' }
                    );
                    snack_bar.onAction().subscribe(() => snack_bar.dismiss());
                }
            )
        );
    }
}
