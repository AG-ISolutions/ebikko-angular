(function() {
    "use strict"

    describe('Unit tests for Secure Share validator', function() {
        var secureShareValidator;

        beforeEach(module('ebikko.secure-share'));

        beforeEach(inject(function($httpBackend, _secureShareValidator_) {
            secureShareValidator = _secureShareValidator_;
        }));

        it("should accept valid secure shares", function() {
            var secureShare = {
                nodeId: '123',
                emails: 'test@test.com',
                expiry_date: new Date(),
                password: 'password',
                repeatPassword: 'password'               
            };

            var response = secureShareValidator.validate(secureShare);

            expect(response.hasErrors).toBeFalsy();
            expect(response.errors).toEqual([]);
        });

        it("should reject secure shares without the required fields", function() {
        	var secureShare = {};

        	var response = secureShareValidator.validate(secureShare);

        	expect(response.hasErrors).toEqual(true);
        	expect(response.errors).toContain("Node ID cannot be blank");
        	expect(response.errors).toContain("Email cannot be blank");
        	expect(response.errors).toContain("Password cannot be blank");
        	expect(response.errors).toContain("Expiry date cannot be blank");
        });

        it("should reject secure shares when the passwords do not match", function() {
        	var secureShare = {
        		nodeId: '123',
        		emails: 'test@test.com',
        		expiry_date: new Date(),
        		password: 'password1',
        		repeatPassword: 'password2'
        	};

        	var response = secureShareValidator.validate(secureShare);

        	expect(response.hasErrors).toEqual(true);
        	expect(response.errors).toContain("Passwords do not match");
        });
    });
})();