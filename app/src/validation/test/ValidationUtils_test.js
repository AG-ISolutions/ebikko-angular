(function() {
    "use strict"

    describe('Unit tests for Validation utils', function() {
        var validationUtils;

        beforeEach(module('ebikko.validation'));

        beforeEach(inject(function(_validationUtils_) {
            validationUtils = _validationUtils_;
        }));

        it("should reject undefined fields", function() {
            var errors = [];

            validationUtils.errorMessageIfUndefined(undefined, "field", errors);

            expect(errors).toContain("field cannot be blank");
        });

        it("should reject null fields", function() {
            var errors = [];

            validationUtils.errorMessageIfUndefined(null, "field", errors);

            expect(errors).toContain("field cannot be blank");
        });

        it("should reject blank fields", function() {
            var errors = [];

            validationUtils.errorMessageIfUndefined("", "field", errors);

            expect(errors).toContain("field cannot be blank");
        });

        it("should reject empty fields", function() {
            var errors = [];

            validationUtils.errorMessageIfUndefined("   ", "field", errors);

            expect(errors).toContain("field cannot be blank");
        });
    });
})();