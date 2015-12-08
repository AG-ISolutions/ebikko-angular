exports.config = {

  specs: [
    './scenarios/nodes-spec.js'
  ],
  
  capabilities: {
    'browserName': 'chrome'
  },
  
  baseUrl: 'http://192.168.1.207/ebikko-angular',

  framework: 'jasmine'
};
