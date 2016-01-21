(function() {
    "use strict";

    describe("Unit tests for the node validator service", function() {
        var nodeCreateValidator, httpBackend;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-create'));

        beforeEach(inject(function(_$httpBackend_, _nodeCreateValidator_) {
            nodeCreateValidator = _nodeCreateValidator_;
            httpBackend = _$httpBackend_;
        }));

        it("should reject nodes without a title", function() {
            var node = {};

            var results = nodeCreateValidator.validate(node);

            expect(results.hasErrors).toBeTruthy();
            expect(results.errors).toContain("title cannot be blank");
        });

        it("should use the alias name of properties", function() {
            var node = {};
            var nodeProperties = getJSONFixture('nodes/nodeDetails_processed.json');

            var results = nodeCreateValidator.validate(node, nodeProperties);

            expect(results.hasErrors).toBeTruthy();
            expect(results.errors).toContain("Meeting Title cannot be blank");
        });

        it("should validate mandatory custom properties", function() {
            var node = {
                data: {
                    "f4c1cf812d254f26a2460d67e3f09b4f": null
                }
            };
            var nodeProperties = getJSONFixture('nodes/nodeDetails_processed.json');

            var results = nodeCreateValidator.validate(node, nodeProperties);

            expect(results.hasErrors).toBeTruthy();
            expect(results.errors).toContain("Date of the Meeting cannot be blank");
        });

    });
})();