exports.config = {

  specs: [
    './scenarios/login-spec.js'
  ],
  
  capabilities: {
    'browserName': 'chrome'
  },
  
  baseUrl: 'http://localhost:9000/',

  framework: 'jasmine'
};
