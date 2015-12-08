(function() {
    "use strict";

    describe("Unit tests for the Login Service", function() {

        var loginService, httpBackend, userRepository, rootScope;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module("ebikko.login"));

        beforeEach(inject(function($httpBackend, _loginService_, _userRepository_, $rootScope) {
            loginService = _loginService_;
            httpBackend = $httpBackend;
            userRepository = _userRepository_;
            rootScope = $rootScope;
            spyOn(rootScope, '$broadcast').and.callThrough();
        }));

        it("should log the user in and load the principal and profile details", function() {
            var loginResponse = getJSONFixture('user/loginSuccess.json');
            httpBackend
                .expectPOST(/\/Login(.*)("username":"user")(.*)("password":"password")(.*)/)
                .respond(200, loginResponse);

            var principalDetails = getJSONFixture('principalDetails.json');
            httpBackend
                .expectGET(/\/Principal(.*)("method":"PRINCIPAL_DETAIL")(.*)("principal_id":"00000000000000000000000000000000")(.*)/)
                .respond(200, principalDetails);

            var profileDetails = getJSONFixture('user/profileDetails.json');
            httpBackend
                .expectGET(/\/Profile(.*)("method":"CURRENT_USER_PROFILE_DETAIL")(.*)/)
                .respond(200, profileDetails);

            loginService.login("user", "password");

            httpBackend.flush();

            expect(userRepository.getCurrentUser()).toEqual(loginResponse);
            expect(userRepository.getPrincipalDetails()).toEqual(principalDetails);
            expect(userRepository.getProfileDetails()).toEqual(profileDetails);
            expect(rootScope.$broadcast).toHaveBeenCalledWith('loginSuccess');
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();