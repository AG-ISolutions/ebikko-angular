(function() {
    "use strict";

    describe("Unit tests for the SelectNodeTypeControlelr", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.select-node-type'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        var selectNodeTypeController, httpBackend;

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            selectNodeTypeController = _$controller_('SelectNodeTypeController');
            httpBackend = _$httpBackend_;
        }));

        it("should load all the node types", function() {
            httpBackend
                .expectGET(/\/NodeType(.*)("method":"NODETYPE_USABLE_LIST")(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypes.json'));

            selectNodeTypeController.activate();

            httpBackend.flush();

            var nodeTypes = selectNodeTypeController.nodeTypes;
            expect(nodeTypes.length).toEqual(9);
            expect(nodeTypes).toContain({
                "node_type_id": "a3c124256dec4893936ef8f26ee361a1",
                "name": "CTC Request",
                "description": "",
                "is_container": true,
                "icon": ""
            });
        });
    });
})();