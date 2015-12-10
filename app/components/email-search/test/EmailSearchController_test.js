(function() {
    "use strict";

    describe("Unit tests for the EmailSearchController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.email-search'));

        var $controller, $q, $rootScope, $httpBackend;

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$httpBackend_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
        }));

        it("should perform a search", function() {
        	$httpBackend
        		.expectPOST(/\/Principal(.*)/)
        		.respond(200, getJSONFixture('principalSearch.json'));
        	var emailSearchController = createController();

        	emailSearchController.performPrincipalSearch('John');

        	$httpBackend.flush();

        	expect(emailSearchController.principals.length).toEqual(1);
        	expect(emailSearchController.principals[0].name).toEqual('Akmal');
        });

        function createController() {
            return $controller('EmailSearchController');
        }
    });
})();