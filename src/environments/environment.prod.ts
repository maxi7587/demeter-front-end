const mpurl = '//tranquil-sands-20400.herokuapp.com/'
// const mpurl = '//demeter.pythonanywhere.com/';
// const mpurl = '//192.168.0.12:8000/';

export const environment = {
    production: true,
    env: 'production',
    MPURL: mpurl,
    APIURL: mpurl,
    clientId: 'UQchCqv7MmohI9VuZR5E2FiuUNb24jBjPRLFIcOy',
    clientSecret:
        `vaEPQLQ0e1nmbuiILs4FpB5iuc3quI6iGYGLFZ07QfX5cL6Mxvz1ii6cBE8NeJZx2I1TQTgaaQZWV5ijK2G1eQxOpth9PwpkIqjVKMxgYssZoFmNxrCcDTZq0DhjRGZ0`,
    whiteListedDomains: [
        'demeter.pythonanywhere.com',
        'tranquil-sands-20400.herokuapp.com',
        '127.0.0.1:8000',
        '127.0.0.1',
        '192.168.0.12:8000'
    ]
};
