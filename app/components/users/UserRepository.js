angular
    .module('ebikko.users')
    .service('userRepository', [UserRepository]);

function UserRepository() {
    var currentUser = null;
    var principalDetails = null;
    var self = this;

    this.setCurrentUser = function(loginDetails) {
        currentUser = loginDetails;
    }

    this.getCurrentUser = function() {
        return currentUser;
    }

    this.getCurrentUserName = function() {
        return self.currentUser.principal_details[0].fullname;
    }

    self.setPrincipalDetails = function(loginDetails) {
        self.principalDetails = loginDetails;
    };

    self.getPrincipalDetails = function() {
    	return self.principalDetails;
    }

    self.clearCurrentUser = function() {
    	currentUser = null;
    	principalDetails = null;
    }

    self.getSessionId = function() {
        return self.getCurrentUser().ebikko_session_id;
    };
}