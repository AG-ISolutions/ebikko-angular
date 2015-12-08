(function() {
    "use strict";

    describe('Unit tests for Forgot Password Service', function() {
        var httpBackend, forgotPasswordService;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.forgot-password'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _forgotPasswordService_) {
            forgotPasswordService = _forgotPasswordService_;
            httpBackend = $httpBackend;
        }));

        it('should send reset password request', function() {
            httpBackend
                .expectPOST(/\/PasswordRecovery(.*)("username":"username")(.*)("repo_id":"test_repo")(.*)("email":"email@address.com")(.*)/)
                .respond(200);

            forgotPasswordService.resetPassword('username', 'test_repo', 'email@address.com');

            httpBackend.flush();
        });
    });
})();