(function() {
    "use strict";

    describe('Unit tests for Node Property Service', function() {
        var httpBackend, nodePropertiesService;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-properties'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _nodePropertiesService_) {
            nodePropertiesService = _nodePropertiesService_;
            httpBackend = $httpBackend;
        }));

        it('should load the full node details', function() {
            httpBackend
                .expectGET(/\/Node(.*)("ebikko_session_id":"123")(.*)("method":"NODE_DETAIL_FULL")(.*)("node_id":"abc-efg")(.*)/)
                .respond(200, getJSONFixture('nodes/nodeDetails.json'));

            nodePropertiesService.getNodeDetails("abc-efg");

            httpBackend.flush();
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();