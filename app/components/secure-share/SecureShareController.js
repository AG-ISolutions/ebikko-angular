(function() {
    "use strict";

    angular
        .module('ebikko.secure-share')
        .controller('secureShareController', ['$mdDialog', '$mdToast', 'secureShareService', 'secureShareValidator', 'messageResolver', SecureShareController]);

    function SecureShareController($mdDialog, $mdToast, secureShareService, secureShareValidator, messageResolver) {
        var self = this;
        this.ss = {
            nodeId: this.nodeId,
            principals: []
        };

        self.cancel = cancel;
        self.secureShare = secureShare;
        self.minDate = new Date();

        function cancel() {
            $mdDialog.cancel();
        }

        function secureShare() {
            self.errors = secureShareValidator.validate(self.ss).errors;
            if (self.errors.length === 0) {
                self.saving = true;
                secureShareService.secureShareNode(self.ss).then(function() {
                    self.saving = false;
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Secure share sent successfully')
                        .position('top left')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                }, function(response) {
                    self.errors = [messageResolver.resolveMessage(response.data.data.responsemsg)];
                    self.saving = false;
                });
            }
        }
    }
})();