(function() {
    "use strict";

    describe("Unit tests for the SettingsMenuController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.settings-menu'));
        var settingsMenuController, userRepository;

        beforeEach(inject(function(_$controller_) {
            userRepository = jasmine.createSpyObj('userRepository', ['getUserPreferences']);

            settingsMenuController = _$controller_('SettingsMenuController', {
                userRepository: userRepository
            });
        }));

        it("should have the change password link visible when auth type is database", function() {
            userRepository.getUserPreferences.and.returnValue(getJSONFixture('user/userPreferences.json'));

            var visible = settingsMenuController.changePasswordVisible();

            expect(visible).toBeTruthy();
        });

        it("should have the change password link hidden when the auth type is AD", function() {
            var userPreferences = getJSONFixture('user/userPreferences.json');
            userPreferences.preferences[0].repoAuthMethod = 'AD';
            userRepository.getUserPreferences.and.returnValue(userPreferences);

            var visible = settingsMenuController.changePasswordVisible();

            expect(visible).toBeFalsy();
        });
    });
})();