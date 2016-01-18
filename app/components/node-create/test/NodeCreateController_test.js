(function() {
    "use strict";

    describe("Unit tests for the NodeCreateController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-create'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        var nodeCreateController, httpBackend;

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            httpBackend = _$httpBackend_;

            httpBackend
                .expectGET(/\/NodeType(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypeDetails.json'));

            nodeCreateController = _$controller_('NodeCreateController');
        }));

        it("should do load and process the node type details", function() {

            httpBackend
                .expectGET(/\/NodeType(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypeDetails.json'));

            nodeCreateController.activate();

            httpBackend.flush();

            expect(nodeCreateController.nodeTypeProperties.length).toEqual(6);
        });
    });
})();