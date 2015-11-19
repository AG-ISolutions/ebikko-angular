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
                    var msg = data.data.data.responsemsg;
                    if (msg.startsWith("EBW-")) {
                        self.errors.push(messageResolver.resolveMessage(msg, data.data.data.responseparam));
                    } else {
                        self.errors.push(msg);
                    }
                });;
        }
    }
})();