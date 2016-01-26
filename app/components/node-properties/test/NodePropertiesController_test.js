(function() {
    "use strict";

    describe("Unit tests for the node properties controller", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-properties'));

        var nodePropertiesController, $q, $rootScope, httpBackend;

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, $httpBackend) {
            nodePropertiesController = _$controller_('NodePropertiesController');
            $q = _$q_;
            $rootScope = _$rootScope_;
            httpBackend = $httpBackend;

            nodePropertiesController.nodeId = "abc-def";
        }));

        it("should parse the properties and set the results on the controller", function() {
            httpBackend
                .expectGET(/\/Node(.*)/)
                .respond(200, getJSONFixture('nodes/nodeDetails.json'));

            httpBackend
                .expectGET(/\/NodeType(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypeDetails.json'));

            nodePropertiesController.activate();

            httpBackend.flush();

            expect(nodePropertiesController.data.length).toEqual(6);
        });
    });
})();