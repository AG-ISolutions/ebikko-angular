(function() {
    "use strict";

    describe('Unit tests for Change Password Service', function() {
        var httpBackend, changePasswordService;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.change-password'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _changePasswordService_) {
            changePasswordService = _changePasswordService_;
            httpBackend = $httpBackend;
        }));

        it('should send change password request', function() {
            httpBackend
                .expectPOST(/\/ChangePassword(.*)("old_password":"oldpassword")(.*)("new_password":"newpassword")(.*)/)
                .respond(200);

            changePasswordService.changePassword('oldpassword', 'newpassword', 'newpassword');

            httpBackend.flush();        	
        });
    });
})();