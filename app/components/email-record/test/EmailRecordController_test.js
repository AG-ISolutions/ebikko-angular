(function() {
    "use strict";

    describe("Unit tests for the EmailRecordController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.email-record'));

        var $controller, $q, $rootScope;
        var $mdDialog,emailRecordService,emailValidator,messageResolver;

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
            $controller = _$controller_;
            $q = _$q_;
            $rootScope = _$rootScope_;

            $mdDialog = jasmine.createSpyObj('$mdDialog', ['hide', 'cancel']);
            emailRecordService = jasmine.createSpyObj('emailRecordService', ['emailRecord']);
            emailValidator = jasmine.createSpyObj('emailValidator', ['validate']);
            messageResolver = jasmine.createSpyObj('messageResolver', ['resolveMessage']);
        }));

        it("should hide the dialog when cancel is clicked", function() {
            var emailRecordController = createController();

            emailRecordController.cancel();

            expect($mdDialog.cancel).toHaveBeenCalled();
        });

        it("should call the email record service and set saving to true when send is clicked and validation passes", function() {
            var emailRecordController = createController();
            emailRecordService.emailRecord.and.returnValue($q.defer().promise);
            emailValidator.validate.and.returnValue(successfulValidation);
            var email = {
                message: "message"
            };
            emailRecordController.email = email;

            emailRecordController.send();

            expect(emailRecordService.emailRecord).toHaveBeenCalledWith(email);
            expect(emailRecordController.saving).toBeTruthy();
        });

        it("should not call the email record service when the validation fails", function() {
            var emailRecordController = createController();
            emailRecordController.email = {};
            emailValidator.validate.and.returnValue(failingValidation);

            emailRecordController.send();

            expect(emailValidator.validate).toHaveBeenCalled();
            expect(emailRecordController.errors).toContain("Error message");
            expect(emailRecordService.emailRecord).not.toHaveBeenCalled();
        });

        it("should display error message and set saving to false when send fails", function() {
            var deferred = $q.defer();
            emailRecordService.emailRecord.and.returnValue(deferred.promise);
            emailValidator.validate.and.returnValue(successfulValidation);

            var emailRecordController = createController();

            emailRecordController.send();

            deferred.reject(getJSONFixture('sendEmailFailure.json'));
            $rootScope.$digest();

            expect(emailRecordController.errors).toContain("Add / Update Node failed!null");
            expect(emailRecordController.saving).toBeFalsy();
        });

        it("should hide the dialog and saving saving to false when the email send succeeds", function() {
            var deferred = $q.defer();
            emailRecordService.emailRecord.and.returnValue(deferred.promise);
            emailValidator.validate.and.returnValue(successfulValidation);

            var emailRecordController = createController();

            emailRecordController.send();

            deferred.resolve(getJSONFixture('sendEmailSuccess.json'));
            $rootScope.$digest();

            expect($mdDialog.hide).toHaveBeenCalled();
            expect(emailRecordController.saving).toBeFalsy();
        });

        function createController() {
            return $controller('EmailRecordController', {
                $mdDialog: $mdDialog,
                emailRecordService: emailRecordService,
                emailValidator: emailValidator
            });
        }

        var failingValidation = {
            hasErrors: true,
            errors: ["Error message"]
        };

        var successfulValidation = {
            hasErrors: false,
            errors: []
        };
    });
})();