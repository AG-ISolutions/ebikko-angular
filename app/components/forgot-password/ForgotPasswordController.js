(function() {
    "use strict";

    angular
        .module('ebikko.forgot-password')
        .controller('ForgotPasswordController', ['forgotPasswordValidator', 'forgotPasswordService', 'messageResolver', '$location', ForgotPasswordController]);

    function ForgotPasswordController(validator, forgotPasswordService, messageResolver, $location) {
        var self = this;

        self.saving = false;
        self.form = {};
        self.submit = submit;

        function submit() {
            self.errors = validator.validate(self.form).errors;
            if (self.errors.length === 0) {
                self.saving = true;
                var splitString = self.form.username.split("@");

                var redirectUrl = $location.absUrl().substring(0, $location.absUrl().indexOf('#'));

                forgotPasswordService
                    .resetPassword(splitString[0], splitString[1], self.form.email, redirectUrl)
                    .then(function(response) {
                        self.saving = false;
                        forgotPasswordService.broadcastSuccessMessage();
                    }, function(response) {
                        self.saving = false;
                        self.errors = [messageResolver.resolveMessage(response.data.data.responsemsg)];
                    });
            }
        }
    }
})();