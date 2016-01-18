(function() {
	"use strict";

	describe("Unit tests for the node create service", function() {
        var nodeCreateService, httpBackend;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-create'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function(_$httpBackend_, _nodeCreateService_) {
            nodeCreateService = _nodeCreateService_;
            httpBackend = _$httpBackend_;
        }));

        it("should do something", function() {

        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();