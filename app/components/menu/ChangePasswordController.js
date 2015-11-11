angular
    .module('ebikko.menu')
    .controller('changePasswordController', ['$mdDialog', 'userService', ChangePasswordController]);

function ChangePasswordController($mdDialog, userService) {
	var self = this;

    self.cancel = function() {
        $mdDialog.cancel();
    }

    self.changePassword = function() {
    	self.errorMessage = null;

        userService
            .changePassword(this.oldPassword, this.newPassword, this.repeatNewPassword)
            .then(function(data) {
            	$mdDialog.hide();
            }, function(data) {
        		self.errorMessage = data.data.data.responsemsg;
            });;
    }
}