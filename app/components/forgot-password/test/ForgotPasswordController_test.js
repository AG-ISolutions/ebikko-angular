(function() {
    "use strict";

    describe("Unit tests for the ForgotPasswordController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        var controller, $q, $rootScope, $location;
        var forgotPasswordService = jasmine.createSpyObj('forgotPasswordService', ['resetPassword', 'broadcastSuccessMessage']);
        var validator = jasmine.createSpyObj('validator', ['validate']);

        beforeEach(module('ebikko.forgot-password'));

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$location_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            $location = _$location_;
            controller = _$controller_('ForgotPasswordController', {
                forgotPasswordService: forgotPasswordService,
                forgotPasswordValidator: validator,
                $location: $location
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
            validator.validate.and.returnValue(successfulValidation);

            var deferred = $q.defer();
            forgotPasswordService.resetPassword.and.returnValue(deferred.promise);

            controller.form.username = 'username@test_repo';
            controller.form.email = 'email@address.com';

            controller.submit();

            expect(controller.saving).toBeTruthy();
            expect(forgotPasswordService.resetPassword).toHaveBeenCalledWith('username', 'test_repo', 'email@address.com', '');

            deferred.resolve();
            $rootScope.$digest();
            expect(controller.saving).toBeFalsy();
            expect(forgotPasswordService.broadcastSuccessMessage).toHaveBeenCalled();
        });

        it("should display the error when calling the service fails", function() {
            validator.validate.and.returnValue(successfulValidation);

            var deferred = $q.defer();
            forgotPasswordService.resetPassword.and.returnValue(deferred.promise);

            controller.form.username = 'username@test_repo';
            controller.form.email = 'email@address.com';

            controller.submit();

            deferred.reject(getJSONFixture('user/resetPasswordFailure.json'));
            $rootScope.$digest();

            expect(controller.errors).toContain('Invalid Username or Password');
        });

        it("should pass the url to the service", function() {
            validator.validate.and.returnValue(successfulValidation);
            controller.form.username = 'username@test_repo';
            controller.form.email = 'email@address.com';

            spyOn($location, 'absUrl').and.returnValue("http://angular.com:123/ang/#/forgotPassword");

            controller.submit();

            expect(forgotPasswordService.resetPassword)
                .toHaveBeenCalledWith('username', 'test_repo', 'email@address.com', 'http://angular.com:123/ang/');
        });

        var successfulValidation = {
            errors: [],
            hasErrors: false
        };
    });
})();