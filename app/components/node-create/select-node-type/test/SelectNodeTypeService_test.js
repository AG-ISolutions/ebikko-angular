(function() {
	"use strict";

	describe("Unit tests for the select node type service", function() {
        var selectNodeTypeService, httpBackend;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.select-node-type'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function(_$httpBackend_, _selectNodeTypeService_) {
            selectNodeTypeService = _selectNodeTypeService_;
            httpBackend = _$httpBackend_;
        }));

        it("should load the available node types", function() {
            httpBackend
                .expectGET(/\/NodeType(.*)("method":"NODETYPE_USABLE_LIST")(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypes.json'));

            selectNodeTypeService.getNodeTypes();

            httpBackend.flush();
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();