(function() {
    "use strict";

    describe("Unit tests for the login controller", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.login'));

        var loginController, $q, httpBackend, userRepository;

        beforeEach(inject(function(_$controller_, _$q_, $httpBackend, _userRepository_) {
            loginController = _$controller_('LoginController');
            $q = _$q_;
            httpBackend = $httpBackend;
            userRepository = _userRepository_;

            loginController.username = 'user';
            loginController.password = 'password';
        }));

        it("should submit a login and set all the details on the user repository", function() {
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

            loginController.login();

            httpBackend.flush();

            expect(userRepository.getCurrentUser()).toEqual(loginResponse);
            expect(userRepository.getPrincipalDetails()).toEqual(principalDetails);
            expect(userRepository.getProfileDetails()).toEqual(profileDetails);
            expect(userRepository.getUserPreferences()).toEqual(userPreferences);
        });

        it("should show forgot password when the authtype is database", function() {
            httpBackend
                .expectGET(/\/AuthType/)
                .respond(200, getJSONFixture('user/authType_database.json'));

            loginController.activate();

            httpBackend.flush();

            expect(loginController.showForgotPassword).toBeTruthy();
        });

        it("should hide forgot password when the authtype is ad", function() {
            httpBackend
                .expectGET(/\/AuthType/)
                .respond(200, getJSONFixture('user/authType_ad.json'));

            loginController.activate();

            httpBackend.flush();

            expect(loginController.showForgotPassword).toBeFalsy();
        });
    });
})();