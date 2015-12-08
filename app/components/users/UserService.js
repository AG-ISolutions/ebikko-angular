(function() {
    'use strict';

    angular
        .module('ebikko.users')
        .service('userService', ['$http', 'userRepository', 'ebikkoConfig', UserService]);

    function UserService($http, userRepository, config) {
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