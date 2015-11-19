(function() {
    "use strict"

    angular
        .module('ebikko.secure-share')
        .service('secureShareValidator', [SecureShareValidator]);

    function SecureShareValidator() {
        var self = {
            validate: validate
        };

        return self;

        function validate(ss) {

            var errors = [];
            errorMessageIfUndefined(ss.nodeId, "Node ID", errors);
            errorMessageIfUndefined(ss.emails, "Email", errors)
            errorMessageIfUndefined(ss.password, "Password", errors)

            if (ss.password !== ss.repeatPassword) {
                errors.push("Passwords do not match");
            }

            errorMessageIfUndefined(ss.expiry_date, "Expiry date", errors)

            return {
                errors: errors,
                hasErrors: errors.length > 0
            }
        };

        function errorMessageIfUndefined(val, field, errors) {
            if (isUndefined(val)) {
                errors.push(field + " cannot be blank");
            }
        }

        function isUndefined(val) {
            return val === null || val === undefined;
        }
    }

})();