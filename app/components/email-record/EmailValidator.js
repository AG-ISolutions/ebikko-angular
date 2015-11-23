(function() {
    "use strict"

    angular
        .module('ebikko.email-record')
        .service('emailValidator', ['validationUtils', EmailValidator]);

    function EmailValidator(validationUtils) {
        var self = {
        	validate: validate
        };

        return self;

        function validate(email) {

        	var errors = [];
            validationUtils.errorMessageIfUndefined(email.to, "To", errors);
            validationUtils.errorMessageIfUndefined(email.subject, "Subject", errors);
            validationUtils.errorMessageIfUndefined(email.message, "Message", errors);

        	return {
                errors: errors,
                hasErrors: errors.length > 0
            }
        }
    }
})();