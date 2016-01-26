(function() {
    'use strict';

    angular
        .module('ebikko.shared-services')
        .service('userRepository', ['$filter', '$rootScope', UserRepository]);

    function UserRepository($filter, $rootScope) {
        var currentUser = null;
        var principalDetails = null;
        var profileDetails = null;
        var self = this;
        var userPreferences = null;

        self.setCurrentUser = function(loginDetails) {
            currentUser = loginDetails;
        };

        self.getCurrentUser = function() {
            return currentUser;
        };

        self.getCurrentUserName = function() {
            return self.currentUser.principal_details[0].fullname;
        };

        self.setPrincipalDetails = function(loginDetails) {
            self.principalDetails = loginDetails;
        };

        self.getPrincipalDetails = function() {
            return self.principalDetails;
        };

        self.clearCurrentUser = function() {
            currentUser = null;
            principalDetails = null;
        };

        self.getSessionId = function() {
            if (self.getCurrentUser() && self.getCurrentUser().ebikko_session_id) {
                return self.getCurrentUser().ebikko_session_id;
            } else {
                $rootScope.$broadcast('noSessionId');
                throw "No Session Id";
            }
        };

        self.setProfileDetails = function(profileDetails) {
            self.profileDetails = profileDetails;
        }

        self.getProfileDetails = function() {
            return self.profileDetails;
        }

        self.hasProfilePermission = function(permissionId) {
            if (self.profileDetails) {
                var matchingPermissions = $filter('filter')(self.profileDetails.results, {
                    'id': permissionId
                }, true);
                if (matchingPermissions.length > 0) {
                    return matchingPermissions[0].value;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        self.getUserPreferences = function() {
            return self.userPreferences;
        }

        self.setUserPreferences = function(userPreferences) {
            self.userPreferences = userPreferences;
        }
    }

})();