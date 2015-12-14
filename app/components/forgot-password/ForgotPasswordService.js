(function() {
    'use strict';

    angular
        .module('ebikko.forgot-password')
        .service('forgotPasswordService', ['$http', '$rootScope', ForgotPasswordService]);

    function ForgotPasswordService($http, $rootScope) {
        var self = {
            broadcastSuccessMessage: broadcastSuccessMessage,
            resetPassword: resetPassword
        };

        return self;

        function broadcastSuccessMessage() {
            $rootScope.$broadcast('passwordResetSuccess');
        }

        function resetPassword(username, repo, email, redirectUrl) {
            var json = {
                'username': username,
                'repo_id': repo,
                'email': email,
                'hasAlliase': true,
                'redirect_url': redirectUrl
            };
            return $http({
                'method': 'Post',
                'url': '/PasswordRecovery?json='+JSON.stringify(json)
            });
        }
    }

})();