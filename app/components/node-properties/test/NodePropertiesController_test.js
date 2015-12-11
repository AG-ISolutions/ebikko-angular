(function() {
    "use strict";

    describe("Unit tests for the node properties controller", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-properties'));

        var nodePropertiesController, nodePropertiesService, nodePropertiesResultsProcessor, $q, $rootScope;

        beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
            nodePropertiesService = jasmine.createSpyObj('nodePropertiesService', ['getNodeDetails', 'getNodeTypeDetails']);
            nodePropertiesResultsProcessor = jasmine.createSpyObj('nodePropertiesResultsProcessor', ['processResults']);
            nodePropertiesController = _$controller_('NodePropertiesController', {
                nodePropertiesService: nodePropertiesService,
                nodePropertiesResultsProcessor: nodePropertiesResultsProcessor
            });
            $q = _$q_;
            $rootScope = _$rootScope_;

            nodePropertiesController.nodeId = "abc-def";
        }));

        it("should parse the node id to extract the node type id", function() {
            nodePropertiesController.activate();

            expect(nodePropertiesService.getNodeDetails).toHaveBeenCalledWith('abc-def');
            expect(nodePropertiesService.getNodeTypeDetails).toHaveBeenCalledWith('abc');
        });

        it("should load all the node information and pass to the processor", function() {
            var nodeDetailsPromise = $q.defer();
            nodePropertiesService.getNodeDetails.and.returnValue(nodeDetailsPromise.promise);

            var nodeTypeDetailsPromise = $q.defer();
            nodePropertiesService.getNodeTypeDetails.and.returnValue(nodeTypeDetailsPromise.promise);

            var resultingData = ["some data"];
            nodePropertiesResultsProcessor.processResults.and.returnValue(resultingData);

            nodePropertiesController.activate();

            var nodeDetails = getJSONFixture('nodes/nodeDetails.json');
            nodeDetailsPromise.resolve(nodeDetails);
            var nodeTypeDetails = getJSONFixture('nodes/nodeProperties.json');
            nodeTypeDetailsPromise.resolve(nodeTypeDetails);

            $rootScope.$digest();

            expect(nodePropertiesResultsProcessor.processResults).toHaveBeenCalledWith(nodeDetails, nodeTypeDetails);
            expect(nodePropertiesController.data).toEqual(resultingData);
        });
    });
})();