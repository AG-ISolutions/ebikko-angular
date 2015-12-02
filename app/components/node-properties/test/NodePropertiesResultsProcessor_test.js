(function() {
    "use strict";

    describe('Unit tests for Node Property Results Processor', function() {
        var httpBackend, processor;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-properties'));

        beforeEach(inject(function($httpBackend, _nodePropertiesResultsProcessor_) {
            processor = _nodePropertiesResultsProcessor_;
            httpBackend = $httpBackend;
        }));

        it('should extract an array of the properties', function() {
            var results = getJSONFixture('nodes/nodeProperties.json');
            var nodeDetails = getJSONFixture('nodes/nodeDetails.json');

            var response = processor.processResults(nodeDetails, results);

            expect(response.length).toEqual(5);
        });

        it('should look up the values for dynamic properties from the node single values', function() {
            var results = getJSONFixture('nodes/nodeProperties.json');
            var nodeDetails = getJSONFixture('nodes/nodeDetails.json');

            var response = processor.processResults(nodeDetails, results);

            expect(response).toContain({
                id: 'f4c1cf812d254f26a2460d67e3f09b4f',
                value: '2015-12-30',
                name: 'Date of the Meeting'
            });
        });

        it('should look up the values for static properties from the node data', function() {
            var results = getJSONFixture('nodes/nodeProperties.json');
            var nodeDetails = getJSONFixture('nodes/nodeDetails.json');

            var response = processor.processResults(nodeDetails, results);

            expect(response).toContain({
                id: '1',
                value: 'Test contain in folder',
                name: 'Title'
            });

            expect(response).toContain({
                id: '3',
                value: 'Some test notes',
                name: 'Notes'
            });
        });

        it('should use the alias name if it exists', function() {
            var results = getJSONFixture('nodes/nodeProperties.json');
            var nodeDetails = getJSONFixture('nodes/nodeDetails.json');

            var response = processor.processResults(nodeDetails, results);

            expect(response).toContain({
                id: '6',
                value: '2014/GGGG/2',
                name: 'Folder'
            });
        });

        it('should only display the username of principals', function() {
            var results = getJSONFixture('nodes/nodeProperties.json');
            var nodeDetails = getJSONFixture('nodes/nodeDetails.json');

            var response = processor.processResults(nodeDetails, results);

            expect(response).toContain({
                id: '1a2b3c',
                value: 'John',
                name: 'Principal'
            });
        });
    });
})();