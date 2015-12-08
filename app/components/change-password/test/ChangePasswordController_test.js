(function() {
    "use strict";

    describe("Unit tests for the ChangePasswordController", function() {

        beforeEach(module('ebikko.change-password'));

        var $controller, $q, $rootScope;

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
            $controller = _$controller_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        }));

        it("should hide the dialog when cancel is clicked", function() {
            spyOn($mdDialog, 'cancel');
            var changePasswordController = createController();

            changePasswordController.cancel();

            expect($mdDialog.cancel).toHaveBeenCalled();
        });

        it("should call the service and if successful, hide the dialog and display the toast", function() {
            var deferred = $q.defer();
            spyOn($mdDialog, 'hide');
            spyOn($mdToast, 'show');
            spyOn(changePasswordService, 'changePassword').and.returnValue(deferred.promise);
            var changePasswordController = createController();

            changePasswordController.changePassword();

            deferred.resolve();
            $rootScope.$digest();

            expect($mdDialog.hide).toHaveBeenCalled();
            expect($mdToast.show).toHaveBeenCalled();
        });

        it("should display a resolved error message if the change password fails", function() {
            var deferred = $q.defer();
            spyOn(changePasswordService, 'changePassword').and.returnValue(deferred.promise);
            spyOn(messageResolver, 'resolveMessage').and.callThrough();
            var changePasswordController = createController();

            changePasswordController.changePassword();

            deferred.reject(errorResponse);
            $rootScope.$digest();

            expect(changePasswordController.errors).toContain("Resolved error message");
            expect(messageResolver.resolveMessage).toHaveBeenCalledWith("EBW-22-12", ["8"]);
        });

        it("should support error responses from server with coded message", function() {
            var deferred = $q.defer();
            spyOn(changePasswordService, 'changePassword').and.returnValue(deferred.promise);
            var changePasswordController = createController();

            changePasswordController.changePassword();

            deferred.reject(otherErrorResponse);
            $rootScope.$digest();

            expect(changePasswordController.errors).toContain("Current Password required");
        });

        var changePasswordService = {
            changePassword: function() {}
        };
        var $mdToast = {
            simple: function() {
                return this;
            },
            content: function() {
                return this;
            },
            position: function() {
                return this;
            },
            hideDelay: function() {
                return this;
            },
            show: function() {}
        };
        var $mdDialog = {
            cancel: function() {},
            hide: function() {}
        };
        var messageResolver = {
            resolveMessage: function(key, params) {
                return "Resolved error message";
            }
        };

        function createController() {
            return $controller('ChangePasswordController', {
                $mdDialog: $mdDialog,
                $mdToast: $mdToast,
                changePasswordService: changePasswordService,
                messageResolver: messageResolver
            });
        }
        var errorResponse = {
            "data": {
                "success": false,
                "code": 200,
                "data": {
                    "responsemsg": "EBW-22-12",
                    "responseparam": ["8"],
                }
            }
        };
        var otherErrorResponse = {
            "data": {
                "success": false,
                "code": 200,
                "data": {
                    "responsemsg": "Current Password required"
                }
            },
        };
    });
})();