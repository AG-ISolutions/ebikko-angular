(function() {
    "use strict";

    describe("Unit tests for user repository", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        var userRepository;

        beforeEach(module("ebikko.shared-services"));

        beforeEach(inject(function(_userRepository_) {
            userRepository = _userRepository_;
        }));

        it("should return true when user has profile permission", function() {
            userRepository.setProfileDetails(getJSONFixture('user/profileDetails.json'));

            var hasPermission = userRepository.hasProfilePermission(11000);

            expect(hasPermission).toBeTruthy();
        });

        it("should return false when user does not have profile permission", function() {
            userRepository.setProfileDetails(getJSONFixture('user/profileDetails.json'));

            var hasPermission = userRepository.hasProfilePermission(5000);

            expect(hasPermission).toBeFalsy();
        });
    });
})();