module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-animate/angular-animate.js',

      'app/components/config/config.js',
      'app/components/menu/menu.js',
      'app/components/nodes/nodes.js',
      'app/components/users/users.js',
      'app/components/login/login.js',

      'app/components/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
