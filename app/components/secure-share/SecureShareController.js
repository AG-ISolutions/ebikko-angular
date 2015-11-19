(function() {
    "use strict"

    angular
        .module('ebikko.secure-share')
        .controller('secureShareController', ['$mdDialog', 'secureShareService', 'secureShareValidator', 'messageResolver', SecureShareController]);

    function SecureShareController($mdDialog, secureShareService, secureShareValidator, messageResolver) {
        var self = this;
        this.ss = {
            nodeId: this.nodeId
        };

        self.cancel = cancel;
        self.secureShare = secureShare;
        self.minDate = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            );

        function cancel() {
            $mdDialog.cancel();
        }

        function secureShare() {
            this.errors = [];
            var validationResponse = secureShareValidator.validate(this.ss);
            if (validationResponse.hasErrors) {
                self.errors = validationResponse.errors;
            } else {
                self.saving = true;
                secureShareService.secureShareNode(this.ss).then(function() {
                    self.saving = false;
                    $mdDialog.hide();
                }, function(response) {
                    self.errors = [messageResolver.resolveMessage(response.data.data.responsemsg).message];
                    self.saving = false;
                });
            }
        }
    }
})();