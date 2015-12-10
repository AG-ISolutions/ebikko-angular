(function() {
    'use strict';

    angular
        .module('ebikko.change-password')
        .service('changePasswordService', ['$http', 'userRepository', ChangePasswordService]);

    function ChangePasswordService($http, userRepository) {
        var self = {
            changePassword: changePassword
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
                'url': '/ChangePassword?json='+JSON.stringify(json)
            });
        }
    }
})();