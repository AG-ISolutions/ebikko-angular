angular
    .module('ebikko.users')
    .service('userService', ['$http', 'loginService', 'ebikkoConfig', UserService]);

function UserService($http, loginService, config) {

    this.changePassword = function(currentPassword, newPassword, repeatNewPassword) {
        var json = {
            'old_password': currentPassword,
            'new_password': newPassword,
            'retype_password': repeatNewPassword,
            'ebikko_session_id': loginService.getSessionId()
        };
        return $http({
            'method': 'Post',
            'url': config.basePath + '/ChangePassword',
            'params': {
                'json': json
            }
        });
    }
}