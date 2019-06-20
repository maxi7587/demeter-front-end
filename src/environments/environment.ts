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
    clientId: '1g1AOeu8vczjmddzbNnQMLTAr9wab1U53Q6Ar4v2',
    clientSecret:
        `XWvy7M6EtDHSJQ9Yb8ohkYBhfdwGwGvsJW6hO9hpXvTI0ombGVwo1weQBNqGZmjxQHbVwuXQPxdkXNQU4DuDSOqtADM6uc0JC2eMA5TCnJXI2TUOI8Uo1WqbOH7mDjDh`,
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
