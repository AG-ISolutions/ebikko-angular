(function() {
    "use strict";

    describe("Unit tests for the menu service", function() {
        var menuService, httpBackend;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.menu'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
                this.getPrincipalDetails = function() {
                    return {
                        results: [{
                            profile_id: '123'
                        }]
                    };
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _menuService_) {
            menuService = _menuService_;
            httpBackend = $httpBackend;
        }));

        it("should load the menu items base on the gadget", function() {
            httpBackend
                .expectGET(/\/Gadget/)
                .respond(200, getJSONFixture('user/gadgetSuccess.json'));

            var menuItems;
            menuService.getMenuItems().then(function(response) {
                menuItems = response;
            });

            httpBackend.flush();

            expect(menuItems.length).toEqual(2);
            expect(menuItems).toContain({
                'name': 'Testgadget',
                'type': 'nodes',
                'content': "<nodes type='saved-search' type-id='b78d02eeced0429098bf14ced7585ff5'/>"
            }, {
                'name': 'Recent Records',
                'type': 'nodes',
                'content': "<nodes type='recent-records'/>"
            });
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();