(function() {
    'use strict';

    angular
        .module('ebikko.shared-services')
        .service('userRepository', ['$filter', UserRepository]);

    function UserRepository($filter) {
        var currentUser = null;
        var principalDetails = null;
        var profileDetails = null;
        var self = this;

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
            return self.getCurrentUser().ebikko_session_id;
        };

        self.setProfileDetails = function(profileDetails) {
            self.profileDetails = profileDetails;
        }

        self.getProfileDetails = function() {
            return self.profileDetails;
        }

        self.hasProfilePermission = function(permissionId) {
            var matchingPermissions = $filter('filter')(self.profileDetails.results, {
                'id': permissionId
            }, true);
            if (matchingPermissions.length > 0) {
                return matchingPermissions[0].value;
            } else {
                return false;
            }
        }
    }

})();