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

        it("should add the model name for static attributes", function() {
            var details = [{
                id: 1,
                isCustomProperty: false
            }];

            var results = nodeCreateService.enrichWithModelNames(details);

            expect(results).toContain({
                id: 1,
                isCustomProperty: false,
                modelName: 'title'
            });
        });

        it("should prepend 'data.' to custom property values", function() {
            var details = [{
                id: 123,
                isCustomProperty: true
            }];

            var results = nodeCreateService.enrichWithModelNames(details);

            expect(results).toContain({
                id: 123,
                isCustomProperty: true,
                modelName: 123
            });
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();