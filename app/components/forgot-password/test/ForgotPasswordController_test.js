(function() {
    "use strict";

    describe("Unit tests for the ForgotPasswordController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        var controller, $q, $rootScope;
        var userService = jasmine.createSpyObj('userService', ['resetPassword']);
        var validator = jasmine.createSpyObj('validator', ['validate']);

        beforeEach(module('ebikko.forgot-password'));

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            controller = _$controller_('ForgotPasswordController', {
                userService: userService,
                forgotPasswordValidator: validator
            });
        }));

        it("should have an error when the validation fails", function() {
            validator.validate.and.returnValue({
                errors: ['Error message'],
                hasErrors: true
            });

            controller.submit();

            expect(controller.errors).toContain('Error message');
        });

        it("should parse the username and set loading to true while calling the service", function() {
            validator.validate.and.returnValue({
                errors: [],
                hasErrors: false
            });

            var deferred = $q.defer();
            userService.resetPassword.and.returnValue(deferred.promise);

            controller.form.username = 'username@test_repo';
            controller.form.email = 'email@address.com';

            controller.submit();

            expect(controller.saving).toBeTruthy();
            expect(userService.resetPassword).toHaveBeenCalledWith('username', 'test_repo', 'email@address.com');

            deferred.resolve();
            $rootScope.$digest();
            expect(controller.saving).toBeFalsy();
        });

        it("should display the error when calling the service fails", function() {
            validator.validate.and.returnValue({
                errors: [],
                hasErrors: false
            });

            var deferred = $q.defer();
            userService.resetPassword.and.returnValue(deferred.promise);

            controller.form.username = 'username@test_repo';
            controller.form.email = 'email@address.com';

            controller.submit();

            deferred.reject(getJSONFixture('user/resetPasswordFailure.json'));
            $rootScope.$digest();

            expect(controller.errors).toContain('Invalid Username or Password');
        });
    });
})();