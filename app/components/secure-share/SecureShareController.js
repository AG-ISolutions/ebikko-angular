(function() {
    "use strict";

    angular
        .module('ebikko.secure-share')
        .controller('secureShareController', ['$mdDialog', 'secureShareService', 'secureShareValidator', 'messageResolver', SecureShareController]);

    function SecureShareController($mdDialog, secureShareService, secureShareValidator, messageResolver) {
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
            self.errors = [];
            var validationResponse = secureShareValidator.validate(self.ss);
            if (validationResponse.hasErrors) {
                self.errors = validationResponse.errors;
            } else {
                self.saving = true;
                secureShareService.secureShareNode(self.ss).then(function() {
                    self.saving = false;
                    $mdDialog.hide();
                }, function(response) {
                    self.errors = [messageResolver.resolveMessage(response.data.data.responsemsg)];
                    self.saving = false;
                });
            }
        }
    }
})();