(function() {
    "use strict";

    describe("Unit tests for the EmailSearchController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.email-search'));

        var $controller, $q, $httpBackend, emailSearchService, emailSearchController;

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function(_$controller_, _$q_, _$httpBackend_, _emailSearchService_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            emailSearchService = _emailSearchService_;

            $httpBackend
                .expectPOST(/\/Principal(.*)/)
                .respond(200, getJSONFixture('principalSearch.json'));

            emailSearchController = createController();
        }));

        it("should perform a search", function() {
            var principals;

            emailSearchController.performPrincipalSearch('John').then(function(response) {
                principals = response;
            });

            $httpBackend.flush();

            expect(principals.length).toEqual(1);
            expect(principals[0].name).toEqual('Akmal');
        });

        it("should default to type ALL, mustBeMemberOf false and require email true", function() {
            spyOn(emailSearchService, 'search').and.callThrough();

            emailSearchController.performPrincipalSearch('John');

            expect(emailSearchService.search).toHaveBeenCalledWith('John', {
                type: 'ALL',
                mustBeMemberOf: false,
                requireEmail: true
            });
        });

        it("should use type PEOPLE when restricted to people", function() {
            spyOn(emailSearchService, 'search').and.callThrough();
            emailSearchController.restrictToPeople = "true";

            emailSearchController.performPrincipalSearch('John');

            expect(emailSearchService.search).toHaveBeenCalledWith('John', jasmine.objectContaining({
                type: 'PEOPLE'
            }));
        });

        it("should use type GROUPS when restricted to groups", function() {
            spyOn(emailSearchService, 'search').and.callThrough();
            emailSearchController.restrictToGroups = "true";

            emailSearchController.performPrincipalSearch('John');

            expect(emailSearchService.search).toHaveBeenCalledWith('John', jasmine.objectContaining({
                type: 'GROUPS'
            }));
        });

        it("should throw exception when both types are set ", function() {
            emailSearchController.restrictToGroups = "true";
            emailSearchController.restrictToPeople = "true";

            expect(function() {
                emailSearchController.performPrincipalSearch('John');
            }).toThrow(new Error("Cannot set both restrictions to true"));
        });

        function createController() {
            return $controller('EmailSearchController');
        }
    });
})();