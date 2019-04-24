const mpurl = '//127.0.0.1:8000/';
// const mpurl = '//192.168.0.12:8000/';

export const environment = {
    production: true,
    env: 'production',
    MPURL: mpurl,
    APIURL: mpurl,
    whiteListedDomains: ['127.0.0.1:8000', '127.0.0.1', '192.168.0.12:8000']
};
