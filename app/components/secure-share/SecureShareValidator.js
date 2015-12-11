(function() {
    "use strict";

    angular
        .module('ebikko.secure-share')
        .service('secureShareValidator', ['validationUtils', SecureShareValidator]);

    function SecureShareValidator(validationUtils) {
        var self = {
            validate: validate
        };

        return self;

        function validate(ss) {

            var errors = [];
            validationUtils.errorMessageIfUndefined(ss.nodeId, "Node ID", errors);
            validationUtils.errorMessageIfUndefined(ss.principals, "Email", errors);
            validationUtils.errorMessageIfUndefined(ss.password, "Password", errors);
            validationUtils.errorMessageIfUndefined(ss.subject, "Subject", errors);
            validationUtils.errorMessageIfUndefined(ss.message, "Message", errors);


            if (ss.password !== ss.repeatPassword) {
                errors.push("Passwords do not match");
            }

            validationUtils.errorMessageIfUndefined(ss.expiry_date, "Expiry date", errors);

            return {
                errors: errors,
                hasErrors: errors.length > 0
            };
        }
    }

})();