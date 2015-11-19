(function() {
    "use strict"

    describe("Unit tests for the SecureShareController", function() {

        beforeEach(module('ebikko.secure-share'));

        var $controller, $q, $rootScope, secureShareValidator, messageResolver;

        var $mdDialog = {
            cancel: function() {},
            hide: function() {}
        };
        var secureShareService = {
            secureShareNode: function() {}
        };
        var secureShareValidator = {
            validate: function() {}
        };
        var messageResolver = {
            resolveMessage: function() {}
        };

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
            $controller = _$controller_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        }));

        it("should hide the dialog when cancel is clicked", function() {
            spyOn($mdDialog, 'cancel');
            var secureShareController = createController();

            secureShareController.cancel();

            expect($mdDialog.cancel).toHaveBeenCalled();
        });

        it("should not call the service when the secure share is invalid", function() {
            secureShareValidator.validate = failingValidation;
            spyOn(secureShareService, 'secureShareNode');

            var secureShareController = createController();

            secureShareController.secureShare();

            expect(secureShareService.secureShareNode.calls.count()).toEqual(0);
            expect(secureShareController.errors).toContain("Some error message");
        });

        it("should call the service and hide the dialog on success", function() {
            secureShareValidator.validate = succesfulValidation;
            spyOn($mdDialog, 'hide');

            var deferred = $q.defer();
            spyOn(secureShareService, 'secureShareNode').and.returnValue(deferred.promise);

            var secureShareController = createController();
            secureShareController.secureShare();

            deferred.resolve();
            $rootScope.$digest();

            expect(secureShareService.secureShareNode).toHaveBeenCalled();
            expect($mdDialog.hide).toHaveBeenCalled();
        });

        it("should reset the errors each time secureShare is called", function() {
            secureShareValidator.validate = succesfulValidation;
            spyOn(secureShareService, 'secureShareNode').and.returnValue($q.defer().promise);
            var secureShareController = createController();
            secureShareController.errors = ["old error message"];

            secureShareController.secureShare();

            expect(secureShareController.errors).toEqual([]);
        });

        it("should set saving to true while the post is in progress and remove on success", function() {
            secureShareValidator.validate = succesfulValidation;
            var deferred = $q.defer();
            spyOn(secureShareService, 'secureShareNode').and.returnValue(deferred.promise);

            var secureShareController = createController();
            secureShareController.secureShare();

            expect(secureShareController.saving).toBeTruthy();

            deferred.resolve();
            $rootScope.$digest();

            expect(secureShareController.saving).toBeFalsy();
        });

        it("should set saving to true while the post is in progress and remove on failure", function() {
            secureShareValidator.validate = succesfulValidation;
            var deferred = $q.defer();
            spyOn(secureShareService, 'secureShareNode').and.returnValue(deferred.promise);
            spyOn(messageResolver, 'resolveMessage').and.returnValue(resolvedMessage);

            var secureShareController = createController();
            secureShareController.secureShare();

            expect(secureShareController.saving).toBeTruthy();

            deferred.reject(errorResponse);
            $rootScope.$digest();

            expect(secureShareController.saving).toBeFalsy();
        });

        it("should set resolved error messages returned from server on the error object", function() {
            secureShareValidator.validate = succesfulValidation;
            var deferred = $q.defer();
            spyOn(secureShareService, 'secureShareNode').and.returnValue(deferred.promise);
            spyOn(messageResolver, 'resolveMessage').and.returnValue(resolvedMessage);

            var secureShareController = createController();
            secureShareController.secureShare();
            deferred.reject(errorResponse);

            $rootScope.$digest();
            expect(messageResolver.resolveMessage).toHaveBeenCalledWith('EBW-18-19');
            expect(secureShareController.errors).toContain("Resolved error message");
        });

        function createController() {
            return $controller('secureShareController', {
                $mdDialog: $mdDialog,
                secureShareService: secureShareService,
                secureShareValidator: secureShareValidator,
                messageResolver: messageResolver
            });
        }

        function failingValidation() {
            return {
                errors: ["Some error message"],
                hasErrors: true
            };
        }

        function succesfulValidation() {
            return {
                errors: [],
                hasErrors: false
            };
        }

        var errorResponse = {
            "data": {
                "success": false,
                "code": 200,
                "data": {
                    "responsemsg": "EBW-18-19",
                    "responseparam": [],
                }
            }
        };
        var resolvedMessage = {
            e: 'code',
            message: 'Resolved error message',
            type: 'danger'
        };
    });
})();