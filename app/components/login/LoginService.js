/**
 *@ngdoc service
 *@name EbikkoServices.ebikkoLoginService
 *@description Login and Logout services
 * issues a broadcast on completion of each to notify other modules
 */
angular
    .module('ebikko.login')
    .service('loginService', ['$http', '$q', '$rootScope', '$location', 'ebikkoConfig', 'userRepository',
        LoginService
    ]);

function LoginService($http, $q, $rootScope, $location, config, userRepository) {
    var self = this;

    self.clearLogin = function() {
        userRepository.clearCurrentUser();
    };
    self.login = function(username, password) {
        var json = {
            'username': username,
            'password': password
        };
        return $http({
            'method': 'Post',
            'url': config.basePath + '/Login',
            'params': {
                'json': json
            }
        }).success(function(data) {
            userRepository.setCurrentUser(data);
            var params = {
                method: "PRINCIPAL_DETAIL",
                principal_id: userRepository.getCurrentUser().principal_id,
                ebikko_session_id: userRepository.getSessionId()
            };
            $http({
                'method': 'GET',
                'url': config.basePath + '/Principal',
                'params': {
                    'json': params
                }
            }).success(function(data) {
                if (data.results[0].profile_name.match(config.userProfileMatch) != null) {
                    userRepository.setPrincipalDetails(data);
                } else {
                    var p = self.logout();
                    p.promise.then(function() {
                        $rootScope.$broadcast('EbikkoMessage', true, 'Admin-1');
                    });
                }
            });
        });
    }
    /**
     *@ngdoc method
     *@name EbikkoServices.ebikkoLoginService.ebikkoLoginService
     *@description Ebikko Logout function
     * A valid logout broadcasts the message 'ValidLogout'
     * and also resets the setPrincipalDetails
     *@methodOf EbikkoServices.ebikkoLoginService
     */
    self.logout = function() {
        var json = {
            'ebikko_session_id': userRepository.getSessionId()
        };
        var promise = $q.defer();
        return $http({
            'method': 'POST',
            'url': config.basePath + '/Logout',
            'params': {'json': json}
        }).success(function(data) {
            userRepository.clearCurrentUser();
            return data;
        });
    };
};