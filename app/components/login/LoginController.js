angular
    .module('ebikko.login')
    .controller('LoginController', ['$http', 'ebikkoConfig', 'loginService',
        LoginController]);

function LoginController($http, config, loginService) {
    this.username = '';
    this.password = '';

    this.login = function() {
        loginService.login(this.username, this.password);
        
    };
};