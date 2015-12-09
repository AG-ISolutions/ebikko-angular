exports.config = {

  specs: [
    './scenarios/*.js'
  ],
  
  capabilities: {
    'browserName': 'chrome'
  },
  
  baseUrl: 'http://192.168.1.207/ebikko-angular',

  framework: 'jasmine'
};
