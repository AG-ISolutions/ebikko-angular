(function() {
    'use strict';

    angular
        .module('ebikko.change-password')
        .controller('ChangePasswordController', ['$mdDialog', '$mdToast', 'userService', 'messageResolver', ChangePasswordController]);

    function ChangePasswordController($mdDialog, $mdToast, userService, messageResolver) {
        var self = this;

        self.cancel = cancel;
        self.changePassword = changePassword;
        self.errors = [];

        function cancel() {
            $mdDialog.cancel();
        }

        function changePassword() {
            self.errors = [];

            userService
                .changePassword(self.oldPassword, self.newPassword, self.repeatNewPassword)
                .then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Password succesfully changed')
                        .position('top left')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                }, function(response) {
                    var msg = response.data.data.responsemsg;
                    if (msg.lastIndexOf("EBW-", 0) === 0) {
                        self.errors.push(messageResolver.resolveMessage(msg, response.data.data.responseparam));
                    } else {
                        self.errors.push(msg);
                    }
                });
        }
    }
})();