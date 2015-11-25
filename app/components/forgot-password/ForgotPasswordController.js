(function() {
    "use strict";

    angular
        .module('ebikko.forgot-password')
        .controller('ForgotPasswordController', ['forgotPasswordValidator', 'userService', 'messageResolver', '$location', ForgotPasswordController]);

    function ForgotPasswordController(validator, userService, messageResolver, $location) {
        var self = this;

        self.saving = false;
        self.form = {};
        self.submit = submit;

        function submit() {

            var validationResponse = validator.validate(self.form);

            if (validationResponse.hasErrors) {
                self.errors = validationResponse.errors;
            } else {
                self.saving = true;
                var splitString = self.form.username.split("@");
                userService
                    .resetPassword(splitString[0], splitString[1], self.form.email)
                    .then(function(response) {
                        self.saving = false;
                        $location.url('/login');
                    }, function(response) {
                        self.saving = false;
                        self.errors = [messageResolver.resolveMessage(response.data.data.responsemsg)];
                    });
            }
        }
    }
})();