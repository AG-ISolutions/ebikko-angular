(function() {
    'use strict';

    /**
     *@ngdoc service
     *@name EbikkoServices.ebikkoLoginService
     *@description Login and Logout services
     * issues a broadcast on completion of each to notify other modules
     */
    angular
        .module('ebikko.login')
        .service('loginService', ['$http', '$q', '$rootScope', '$location', 'userRepository',
            LoginService
        ]);

    function LoginService($http, $q, $rootScope, $location, userRepository) {
        var self = {
            checkAuthType: checkAuthType,
            clearLogin: clearLogin,
            login: login,
            logout: logout
        };

        return self;

        function checkAuthType() {
            return $http({
                'method': 'GET',
                'url': '/AuthType'
            }).then(function(response) {
                return response.data.authMethod;
            }, function(response) {
                return "database";
            });
        }

        function clearLogin() {
            userRepository.clearCurrentUser();
        }

        function login(username, password) {
            self.clearLogin();

            var json = {
                'username': username,
                'password': password
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'POST',
                'url': '/Login?json=' + stringed
            }).then(function(response) {
                userRepository.setCurrentUser(response.data);

                $q.all([loadPrincipalDetails(), loadProfileDetails(), loadUserPreferences()]).then(function(responses) {
                    userRepository.setPrincipalDetails(responses[0].data);
                    userRepository.setProfileDetails(responses[1].data);
                    userRepository.setUserPreferences(responses[2].data);
                    $rootScope.$broadcast('loginSuccess');
                });
            });
        }

        function loadPrincipalDetails() {
            var json = {
                method: "PRINCIPAL_DETAIL",
                principal_id: userRepository.getCurrentUser().principal_id,
                ebikko_session_id: userRepository.getSessionId()
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/Principal?json=' + stringed
            });
        }

        function loadProfileDetails() {
            var json = {
                method: "CURRENT_USER_PROFILE_DETAIL",
                ebikko_session_id: userRepository.getSessionId()
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/Profile?json=' + stringed
            });
        }

        function loadUserPreferences() {
            var json = {
                method: "GET_USER_PREFS",
                principal_id: userRepository.getCurrentUser().principal_id,
                ebikko_session_id: userRepository.getSessionId()
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/UserPreferences?json=' + stringed
            });
        }

        function logout() {
            try {
                var json = {
                    'ebikko_session_id': userRepository.getSessionId()
                };
                return $http({
                    'method': 'POST',
                    'url': '/Logout',
                    'params': {
                        'json': json
                    }
                }).then(completeLogout, completeLogout);
            } catch (err) {
                completeLogout();
            }
        }

        function completeLogout() {
            $rootScope.$broadcast('logoutSuccess');
        }
    }
})();