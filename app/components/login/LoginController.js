(function() {
    'use strict';

    angular
        .module('ebikko.login')
        .controller('LoginController', ['$http', '$location', 'loginService', 'messageResolver',
            LoginController
        ]);

    function LoginController($http, $location, loginService, messageResolver) {
        var self = this;

        self.activate = activate;
        self.showForgotPassword = true;
        self.login = login;
        self.username = '';
        self.password = '';

        function activate() {
            loginService.checkAuthType().then(function(response){
                self.showForgotPassword = response === "database";
            });
        }

        function login() {
            self.errorMessage = "";

            loginService.login(self.username, self.password)
                .then(function(response) {}, function(response) {
                    self.errorMessage = messageResolver.resolveMessage(response.data.data.responsemsg);
                });
        }
    }
})();