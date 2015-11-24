(function() {
    'use strict';

    angular
        .module('ebikko.users')
        .service('userService', ['$http', 'userRepository', 'ebikkoConfig', UserService]);

    function UserService($http, userRepository, config) {

        this.changePassword = function(currentPassword, newPassword, repeatNewPassword) {
            var json = {
                'old_password': currentPassword,
                'new_password': newPassword,
                'retype_password': repeatNewPassword,
                'ebikko_session_id': userRepository.getSessionId()
            };
            return $http({
                'method': 'Post',
                'url': config.basePath + '/ChangePassword',
                'params': {
                    'json': json
                }
            });
        };
    }

})();