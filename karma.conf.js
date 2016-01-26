module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-new-router/dist/router.es5.js',
            'app/bower_components/angular-aria/angular-aria.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-translate/angular-translate.js',

            'app/shared/validation/validation.js',

            'app/components/config/config.js',
            'app/components/forgot-password/forgotPassword.js',

            'app/conf/conf.js',
            'app/components/menu/menu.js',
            'app/components/menu/tabs/tabs.js',
            'app/components/menu/node-menu/node-menu.js',
            'app/components/menu/settings-menu/settings-menu.js',
            'app/components/nodes/nodes.js',
            'app/components/login/login.js',
            'app/components/secure-share/secureShare.js',
            'app/components/change-password/changePassword.js',
            'app/components/email-record/emailRecord.js',
            'app/components/node-properties/nodeProperties.js',
            'app/components/node-content/nodeContent.js',
            'app/components/email-search/emailSearch.js',
            'app/shared/services/shared-services.js',

            'app/shared/treetable/angular-treetable.js',
            'app/shared/validation/**/*.js',

            'app/components/**/*.js',
            'app/components/**/*.html',
            'app/shared/**/*.js',
            'app/conf/**/*.js',

            {
                pattern: 'test/fixtures/**/*',
                watched: true,
                served: true,
                included: false
            }
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        preprocessors: {
            'app/components/email-search/emailSearch.html': ['ng-html2js']
        },

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'test-templates'
        },

        reporters: [
            'progress', 'junit'
        ]
    });
};