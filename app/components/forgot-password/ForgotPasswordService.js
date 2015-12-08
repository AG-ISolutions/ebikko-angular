(function() {
    'use strict';

    angular
        .module('ebikko.forgot-password')
        .service('forgotPasswordService', ['$http', 'userRepository', ForgotPasswordService]);

    function ForgotPasswordService($http, userRepository) {
        var self = {
            resetPassword: resetPassword
        };

        return self;

        function resetPassword(username, repo, email) {
            var json = {
                'username': username,
                'repo_id': repo,
                'email': email,
                'hasAlliase': true
            };
            return $http({
                'method': 'Post',
                'url': '/PasswordRecovery?json='+JSON.stringify(json)
            });
        }
    }

})();