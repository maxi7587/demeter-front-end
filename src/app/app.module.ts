import { NgModule, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from 'src/app/error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
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
        this.oAuthService.clientId = 'c6xuho0aBs6GKMGqwbVPgNIJILKfgGK2mxh0HleW';
        // set the scope for the permissions the client should request
        this.oAuthService.scope = 'read groups write';
        this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
        // Set a dummy secret
        // tslint:disable: max-line-length
        this.oAuthService.dummyClientSecret = `u4Qx87NiWWmibYTM5O1Ejhdu43xyBJ9BLY4parQBzHbdvJ4ylTchxWKfZSnqz5HoXqOXsG1Yhl1fLbObWCiegFd8cGculX9SsWPQ5qEmhVsDamgM8nCmFj2eus54upcA`;
    }
}
