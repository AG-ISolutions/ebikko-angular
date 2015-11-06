/**
 *@ngdoc service
 *@name EbikkoServices.ebikkoLoginService
 *@description Login and Logout services
 * issues a broadcast on completion of each to notify other modules
 */
angular
    .module('ebikko.login')
    .service('loginService', ['$http', '$q', '$rootScope', '$location', 'ebikkoConfig',
        LoginService
    ]);

function LoginService($http, $q, $rootScope, $location, config) {
    var self = this;

    self.setLogin = function(loginDetails) {
        self.loginDetails = loginDetails;
        self.name = loginDetails.principal_details[0].fullname;
    };

    self.setPrincipalDetails = function(loginDetails) {
        self.principalDetails = loginDetails;
        self.validLogin = true;
    };

    self.clearLogin = function() {
        self.loginDetails = {};
        self.validLogin = false;
    };
    self.getSessionId = function() {
        return self.loginDetails.ebikko_session_id;
    };

    self.login = function(username, password) {
            $http({
                'method': 'Post',
                'url': config.basePath + '/Login',
                'params': {
                    'json': '{"username": "' + username + '","password":"' + password + '"}'
                }
            }).success(function(data) {
                self.setLogin(data);
                var params = {
                    method: "PRINCIPAL_DETAIL",
                    principal_id: self.loginDetails.principal_id,
                    ebikko_session_id: self.getSessionId()
                };
                $http({
                    'method': 'GET',
                    'url': config.basePath + '/Principal',
                    'params': {
                        'json': params
                    }
                }).success(function(data) {
                    if (data.results[0].profile_name.match(config.userProfileMatch) != null) {
                        //$rootScope.$broadcast('EbikkoValidLogin', true);
                        //$scope.validLogin = true;
                        self.setPrincipalDetails(data);
                        $location.url("/nodes/recent-records");
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
    this.logout = function() {
        var promise = $q.defer();
        $http({
            'method': 'Post',
            'url': '/Logout',
            'params': {
                'json': '{"ebikko_session_id":"' + sessionDetails.sessonId() + '"}'
            }
        }).success(function(data) {
            sessionDetails.clearLogin();
            $rootScope.$broadcast('EbikkoValidLogout', true);
            promise.resolve(data);
        });
        return promise.promise;
    };
};