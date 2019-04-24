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
    clientId: 'c6xuho0aBs6GKMGqwbVPgNIJILKfgGK2mxh0HleW',
    clientSecret:
        `u4Qx87NiWWmibYTM5O1Ejhdu43xyBJ9BLY4parQBzHbdvJ4ylTchxWKfZSnqz5HoXqOXsG1Yhl1fLbObWCiegFd8cGculX9SsWPQ5qEmhVsDamgM8nCmFj2eus54upcA`,
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
