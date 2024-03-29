import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'demeter-front';

    constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('es');
    }
}
