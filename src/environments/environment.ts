// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const mpurl = '//127.0.0.1:8000/';
// const mpurl = '//192.168.0.12:8000/';

export const environment = {
    production: false,
    env: 'develop',
    MPURL: mpurl,
    APIURL: mpurl,
    clientId: 'BcwpOkuNbBek9nskCgSHakJzbKQG4STNODdr5IPg',
    clientSecret:
        `zedmA5fvaM44Q3I5wlnXBWxt6RzUVgsRYQFJQJCNYAixZFTsW7cTe0mZ4fQ3YNq4V0gMtbinZKYW5IavsVqwwnyKL5bY9gk0nyF8OLE7t202sOOFAOx1nzPMcxXo0GJU`,
    whiteListedDomains: ['127.0.0.1:8000', '127.0.0.1', '192.168.0.12:8000']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
