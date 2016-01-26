(function() {
    "use strict";

    describe("Unit tests for the NodeMenuController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-menu'));

        var nodeMenuController, userRepository;

        beforeEach(inject(function(_$controller_, _$rootScope_) {
            userRepository = jasmine.createSpyObj('userRepository', ['getPrincipalDetails']);
       
            nodeMenuController = _$controller_('NodeMenuController', {
                userRepository: userRepository,
                $scope: _$rootScope_.$new()
            });
        }));

        it("should disable the email option when the user does not have an email address", function() {
            userRepository.getPrincipalDetails.and.returnValue(getJSONFixture('principalDetails_withoutEmail.json'));

            expect(nodeMenuController.hasEmail()).toBeFalsy();
        });

        it("should disable the email option when there are no user details", function() {
            userRepository.getPrincipalDetails.and.returnValue(undefined);

            expect(nodeMenuController.hasEmail()).toBeFalsy();
        });

        it("should enable the email option whe the user does have an email address", function() {
            userRepository.getPrincipalDetails.and.returnValue(getJSONFixture('principalDetails.json'));

            expect(nodeMenuController.hasEmail()).toBeTruthy();
        });
    });
})();