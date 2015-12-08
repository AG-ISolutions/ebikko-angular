(function() {
    "use strict";

    describe('Unit tests for User Service', function() {
        var httpBackend, userService;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.users'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _userService_) {
            userService = _userService_;
            httpBackend = $httpBackend;
        }));

        it('should send reset password request', function() {
            httpBackend
                .expectPOST(/\/PasswordRecovery(.*)("username":"username")(.*)("repo_id":"test_repo")(.*)("email":"email@address.com")(.*)/)
                .respond(200);

            userService.resetPassword('username', 'test_repo', 'email@address.com');

            httpBackend.flush();
        });
    });
})();