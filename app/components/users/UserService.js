(function() {
    'use strict';

    angular
        .module('ebikko.users')
        .service('userService', ['$http', 'userRepository', 'ebikkoConfig', UserService]);

    function UserService($http, userRepository, config) {
        var self = {
            changePassword: changePassword,
            resetPassword: resetPassword
        };

        return self;

        function changePassword(currentPassword, newPassword, repeatNewPassword) {
            var json = {
                'old_password': currentPassword,
                'new_password': newPassword,
                'retype_password': repeatNewPassword,
                'ebikko_session_id': userRepository.getSessionId()
            };
            return $http({
                'method': 'Post',
                'url': config.basePath + '/ChangePassword?json='+JSON.stringify(json)
            });
        }

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