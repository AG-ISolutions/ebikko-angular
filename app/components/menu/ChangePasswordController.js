(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('changePasswordController', ['$mdDialog', '$mdToast', 'userService', ChangePasswordController]);

    function ChangePasswordController($mdDialog, $mdToast, userService) {
        var self = this;

        self.cancel = function() {
            $mdDialog.cancel();
        }

        self.changePassword = function() {
            self.errorMessage = null;

            userService
                .changePassword(this.oldPassword, this.newPassword, this.repeatNewPassword)
                .then(function(data) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Password succesfully changed')
                        .position('top left')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                }, function(data) {
                    self.errorMessage = data.data.data.responsemsg;
                });;
        }
    }
})();