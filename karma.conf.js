module.exports = function(config) {
    config.set({

        basePath: './app',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-animate/angular-animate.js',

            'components/config/config.js',
            'components/menu/menu.js',
            'components/users/Users.js',
            'components/nodes/nodes.js',
            'components/login/login.js',
            'components/secure-share/secureShare.js',

            'src/treetable/angular-treetable.js',

            'components/**/*.js',
            'components/**/*.html'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        preprocessors: {
            'components/**/*.html': ['ng-html2js']
        },

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};