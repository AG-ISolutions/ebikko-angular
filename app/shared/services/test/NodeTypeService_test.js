(function() {
    "use strict";

    describe('Unit tests for Node Type Service', function() {
        var httpBackend, nodeTypeService;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.shared-services'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _nodeTypeService_) {
            nodeTypeService = _nodeTypeService_;
            httpBackend = $httpBackend;
        }));

        it('should load the node type properties', function() {
            httpBackend
                .expectGET(/\/NodeType(.*)("ebikko_session_id":"123")(.*)("method":"NODETYPE_PROPERTIES")(.*)("node_type_id":"abc")(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypeDetails.json'));

            nodeTypeService.getNodeTypeDetails("abc");

            httpBackend.flush();
        });

        it('should process node type details into an array', function() {
            var nodeDetails = getJSONFixture('nodes/nodeTypeDetails.json').results[0];

            var results = nodeTypeService.processNodeTypeDetails(nodeDetails);

            expect(results.length).toEqual(6);
        });

        it('should use the alias name if it exists', function() {
            var nodeDetails = getJSONFixture('nodes/nodeTypeDetails.json').results[0];

            var results = nodeTypeService.processNodeTypeDetails(nodeDetails);

            expect(results).toContain({
                id: '6',
                isMultiValue: false,
                type: null,
                name: 'Folder',
                isCustomProperty: false
            });
        });

        it('should include the type for custom properties', function() {
            var nodeDetails = getJSONFixture('nodes/nodeTypeDetails.json').results[0];

            var results = nodeTypeService.processNodeTypeDetails(nodeDetails);

            expect(results).toContain({
                id: 'f4c1cf812d254f26a2460d67e3f09b4f',
                isMultiValue: false,
                type: 500,
                name: 'Date of the Meeting',
                isCustomProperty: true
            });
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();