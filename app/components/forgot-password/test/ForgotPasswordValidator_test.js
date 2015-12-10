(function() {
	"use strict";

	describe("Unit tests for the forgot password validation", function() {

		var forgotPasswordValidator;

		beforeEach(module('ebikko.forgot-password'));

        beforeEach(inject(function($httpBackend, _forgotPasswordValidator_) {
            forgotPasswordValidator = _forgotPasswordValidator_;
        }));

        if("should accept valid forms", function() {
        	var form = {
        		username: 'username@repo',
        		email: 'test@address.com'
        	};

        	var response = forgotPasswordValidator.validate(form);

        	expect(response.hasErrors).toBeFalsy();
        	expect(response.errors).toEqual([]);
        });

		it("should reject forms with a blank user and blank email", function() {
			var form = {
				username: '',
				email: ''
			};

			var response = forgotPasswordValidator.validate(form);

            expect(response.hasErrors).toBeTruthy();
            expect(response.errors).toContain("Email cannot be blank");
            expect(response.errors).toContain("Username cannot be blank");
		});

		it("should reject forms without the username in the proper format", function() {
			var form = {
				username: 'user',
				email: 'email@address.com'
			};

			var response = forgotPasswordValidator.validate(form);

			expect(response.hasErrors).toBeTruthy();
			expect(response.errors).toContain("Username must be in the format username@repo");
		});
	});
})();