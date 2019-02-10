import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JwksValidationHandler, OAuthStorage, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { getToken } from './get-token';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, location.origin + '/assets/i18n/', '.json');
    // return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: getToken,
            whitelistedDomains: environment.whiteListedDomains
        }
    }),
    OAuthModule.forRoot({
        resourceServer: {
            allowedUrls: environment.whiteListedDomains,
            sendAccessToken: true
        }
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [ HttpClient ]
        }
    }),
    SharedModule
  ],
  providers: [
    OAuthService,
    {
        provide: OAuthStorage,
        useValue: sessionStorage
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    public constructor(private oAuthService: OAuthService) {
        this.configOAuth();
    }

    private configOAuth() {
        this.oAuthService.requireHttps = false;
        this.oAuthService.setStorage(sessionStorage);
        this.oAuthService.tokenEndpoint = environment.APIURL + 'o/token/';
        // The SPA's id. Register SPA with this id at the auth-server
        this.oAuthService.clientId = 'QFGawDnlYt4XUmoL2PzSSTeLd6BQij0GDRHKLNnK';
        // set the scope for the permissions the client should request
        this.oAuthService.scope = 'read groups write';
        this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
        // Set a dummy secret
        // tslint:disable: max-line-length
        this.oAuthService.dummyClientSecret = `OTKyDLH6bMs92IB9VauZ2HR2uRuFGasRxNfi5UnY9tuDLErvyGryLRuoCeRHgJC2kDhTp1xTALikWhXQFQK5ktURv7HSniXp155rQIOx2AO6KWxShnQkm2cTwaSyOmV6`;
    }
}
