(function() {
    'use strict';

    angular
        .module('ebikko.login')
        .controller('LoginController', ['$http', '$location', 'loginService', 'messageResolver',
            LoginController
        ]);

    function LoginController($http, $location, loginService, messageResolver) {
        var self = this;

        self.login = login;
        self.username = '';
        self.password = '';

        function login() {
            self.errorMessage = "";

            loginService.login(self.username, self.password)
                .then(function(response) {
                    $location.url("/menu");
                }, function(response) {
                    self.errorMessage = messageResolver.resolveMessage(response.data.data.responsemsg);
                });
        }
    }
})();