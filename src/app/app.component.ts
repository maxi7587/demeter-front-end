import { Component } from '@angular/core';
// import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title = 'demeter-front';

    // public constructor(public oAuthService: OAuthService) {
    //     console.log('inside app component CONSTRUCTOR');
    //     // Login-Url
    //     this.oAuthService.requireHttps = false;
    //     this.oAuthService.tokenEndpoint = 'http://127.0.0.1:8000/o/token/';
    //
    //     // Url with user info endpoint
    //     // This endpont is described by OIDC and provides data about the loggin user
    //     // This sample uses it, because we don't get an id_token when we use the password flow
    //     // If you don't want this lib to fetch data about the user (e. g. id, name, email) you can skip this line
    //     // this.oAuthService.userinfoEndpoint = 'https://steyer-identity-server.azurewebsites.net/identity/connect/userinfo';
    //
    //     // The SPA's id. Register SPA with this id at the auth-server
    //     this.oAuthService.clientId = 'URwR3zywSrhBjIhhOHEqPazqEsGOfIMKfFICVA2r';
    //
    //     // set the scope for the permissions the client should request
    //     this.oAuthService.scope = 'read groups write',
    //
    //     // Set a dummy secret
    //     // Please note that the auth-server used here demand the client to transmit a client secret, although
    //     // the standard explicitly cites that the password flow can also be used without it. Using a client secret
    //     // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
    //     // Using such a dummy secret is as safe as using no secret.
    //     // tslint:disable:max-line-length
    //     this.oAuthService.dummyClientSecret = `caVDqs9vHpJrWoA6AZJzDscvPjPKHBTKGSQe0E2jqDUdqhiGUVYm4sdXICwZSaKbt2DYC4KPk3Anv6VED9i2Mo1rZKa2N3r5HrwQfZEMHB4IUkXMS4G5tln1kWwz9s2l`;
    // }
}
