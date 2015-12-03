(function() {
    "use strict";

    describe("Unit tests for the MenuController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.menu'));

        var menuController;
        var tabService, userRepository, menuService;

        beforeEach(inject(function(_$controller_) {
            tabService = jasmine.createSpyObj('tabService', ['addTab', 'getTabs']);
            userRepository = jasmine.createSpyObj('userRepository', ['getPrincipalDetails']);
            menuService = jasmine.createSpyObj('menuService', ['getMenuItems']);

            menuController = _$controller_('MenuController', {
                tabService: tabService,
                userRepository: userRepository,
                menuService: menuService
            });
        }));

        it("should add a new tab, set show search to false when quick search is called", function() {
            menuController.searchQuery = 'search query';
            menuController.showSearch = true;

            menuController.quickSearch();

            expect(tabService.addTab).toHaveBeenCalledWith({
                name: 'Search',
                type: 'nodes',
                content: "<nodes type='search' type-id='search query' />",
            });
            expect(menuController.showSearch).toBeFalsy();
        });

        it("should not add a new tab when quick search is empty", function() {
            menuController.searchQuery = '';

            menuController.quickSearch();

            expect(tabService.addTab.calls.count()).toEqual(0);
        });

        it("should disable the email option when the user does not have an email address", function() {
            userRepository.getPrincipalDetails.and.returnValue(getJSONFixture('principalDetails_withoutEmail.json'));

            expect(menuController.hasEmail()).toBeFalsy();
        });

        it("should disable the email option when there are no user details", function() {
            userRepository.getPrincipalDetails.and.returnValue(undefined);

            expect(menuController.hasEmail()).toBeFalsy();            
        });

        it("should enable the email option whe the user does have an email address", function() {
            userRepository.getPrincipalDetails.and.returnValue(getJSONFixture('principalDetails.json'));

            expect(menuController.hasEmail()).toBeTruthy();
        });
    });
})();