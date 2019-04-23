import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    public constructor(
        public ngZone: NgZone,
        public injector: Injector
    ) { }
    public handleError(error) {
        let router = this.injector.get(Router);
        if (
            error && error.error &&
            error.error.detail === 'Authentication credentials were not provided.'
        ) {
            this.ngZone.run(() => router.navigate(['/login']));
        }
        // IMPORTANT: commented this cause it was hanging app
        // throw error;
    }
}
