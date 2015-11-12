angular
    .module('ebikko.login')
    .controller('LoginController', ['$http', '$location', 'ebikkoConfig', 'loginService', 'messageResolver',
        LoginController
    ]);

function LoginController($http, $location, config, loginService, messageResolver) {
    var self = this;

    self.username = '';
    self.password = '';

    self.login = function() {
        self.errorMessage = "";

        loginService.login(this.username, this.password)
            .then(function(response) {
                $location.url("/menu");
            }, function(response) {
                self.errorMessage = messageResolver.resolveMessage(response.data.data.responsemsg).message;
            });;
    };
};