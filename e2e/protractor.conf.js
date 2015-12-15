exports.config = {

    chromeDriver: '../node_modules/protractor/selenium/chromedriver',
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',

    specs: [
        './scenarios/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8080/app',

    framework: 'jasmine',

    params: {
        login: {
            username: 'root@demo208',
            password: 'root'
        }
    }
};