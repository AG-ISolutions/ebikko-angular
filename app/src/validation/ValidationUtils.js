(function() {
    "use strict"

    angular
        .module('ebikko.validation')
        .service('validationUtils', [ValidationUtils]);

    function ValidationUtils() {
        var self = {
            errorMessageIfUndefined: errorMessageIfUndefined
        };

        function errorMessageIfUndefined(val, field, errors) {
            if (isUndefined(val)) {
                errors.push(field + " cannot be blank");
            }
        }

        function isUndefined(val) {
            var invalid = (val === null || val === undefined);
            if (!invalid && typeof val === "string"){
                invalid = val.trim() === "" 
            }

            return invalid;
        }

        return self;
    }
})();