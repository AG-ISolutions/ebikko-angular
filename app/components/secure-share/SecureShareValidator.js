(function() {
    "use strict"

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
            validationUtils.errorMessageIfUndefined(ss.emails, "Email", errors)
            validationUtils.errorMessageIfUndefined(ss.password, "Password", errors)

            if (ss.password !== ss.repeatPassword) {
                errors.push("Passwords do not match");
            }

            validationUtils.errorMessageIfUndefined(ss.expiry_date, "Expiry date", errors)

            return {
                errors: errors,
                hasErrors: errors.length > 0
            }
        };
    }

})();