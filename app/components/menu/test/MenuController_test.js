(function() {
    "use strict";

    describe("Unit tests for the MenuController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.menu'));

        var menuController;
        var tabService, userRepository, menuService;

        beforeEach(inject(function(_$controller_) {
            tabService = jasmine.createSpyObj('tabService', ['addTab', 'getTabs', 'toggleFullscreen']);
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

        it("should toggle the active tab in and out of fullscreen", function() {
            menuController.toggleFullscreen();
            
            expect(tabService.toggleFullscreen).toHaveBeenCalled(); 
        });
    });
})();