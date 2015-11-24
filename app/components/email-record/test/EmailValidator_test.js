(function() {
    "use strict";

    describe('Unit tests for Email validator', function() {
        var emailValidator;

        beforeEach(module('ebikko.email-record'));

        beforeEach(inject(function($httpBackend, _emailValidator_) {
            emailValidator = _emailValidator_;
        }));

        it("should accept valid emails", function() {
            var email = {
                to: "Person",
                subject: "Subject",
                message: "Message"
            };

            var response = emailValidator.validate(email);

            expect(response.hasErrors).toBeFalsy();
            expect(response.errors).toEqual([]);
        });

        it("should reject invalid emails", function() {
            var response = emailValidator.validate({});

            expect(response.hasErrors).toBeTruthy();
            expect(response.errors).toContain("To cannot be blank");
            expect(response.errors).toContain("Subject cannot be blank");
            expect(response.errors).toContain("Message cannot be blank");
        });

        it("should reject empty values", function() {
            var email = {
                to: "",
                subject: "",
                message: ""
            };

            var response = emailValidator.validate(email);

            expect(response.hasErrors).toBeTruthy();
            expect(response.errors).toContain("To cannot be blank");
            expect(response.errors).toContain("Subject cannot be blank");
            expect(response.errors).toContain("Message cannot be blank");
        });
    });
})();