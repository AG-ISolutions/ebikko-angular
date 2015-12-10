exports.config = {

  specs: [
    './scenarios/*.js'
  ],
  
  capabilities: {
    'browserName': 'chrome'
  },
  
  baseUrl: 'http://localhost:8080/app',

  framework: 'jasmine'
};
