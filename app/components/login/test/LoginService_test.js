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

            var userPreferences = getJSONFixture('user/userPreferences.json');
            httpBackend
                .expectGET(/\/UserPreferences(.*)("method":"GET_USER_PREFS")/)
                .respond(200, userPreferences);

            loginService.login("user", "password");

            httpBackend.flush();

            expect(userRepository.getCurrentUser()).toEqual(loginResponse);
            expect(userRepository.getPrincipalDetails()).toEqual(principalDetails);
            expect(userRepository.getProfileDetails()).toEqual(profileDetails);
            expect(userRepository.getUserPreferences()).toEqual(userPreferences);

            expect(rootScope.$broadcast).toHaveBeenCalledWith('loginSuccess');
        });

        it("should check the auth type", function() {
            httpBackend
                .expectGET(/\/AuthType/)
                .respond(200, getJSONFixture('user/authType_ad.json'));

            var authType;
            loginService.checkAuthType().then(function(response) {
                authType = response;
            });

            httpBackend.flush();

            expect(authType).toEqual('ad');
        });

        it("should default the auth type to database when the call fails", function() {
            httpBackend
                .expectGET(/\/AuthType/)
                .respond(500);

            var authType;
            loginService.checkAuthType().then(function(response) {
                authType = response;
            });

            httpBackend.flush();

            expect(authType).toEqual('database');
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();