(function() {
    "use strict";

    describe("Unit tests for the NodesController", function() {
        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.nodes'));

        var nodeService = jasmine.createSpyObj('nodeService', ['getRecentRecords', 'getSavedSearch', 'search']);
        var nodesController;

        beforeEach(inject(function(_$controller_) {
            nodesController = _$controller_('NodesController', {
                nodeService: nodeService
            });
        }));

        it("should get recent records when type is recent-records", function() {
            nodesController.type = 'recent-records';

            nodesController.activate();

            expect(nodeService.getRecentRecords).toHaveBeenCalled();
        });

        it("should get saved search when type is saved-search", function() {
            nodesController.type = 'saved-search';
            nodesController.typeId = '123';

            nodesController.activate();

            expect(nodeService.getSavedSearch).toHaveBeenCalledWith('123');        	
        });

        it("should perform search when type is search", function() {
        	nodesController.type = 'search';
        	nodesController.typeId = 'search query';

        	nodesController.activate();

        	expect(nodeService.search).toHaveBeenCalledWith('search query');
        });

        function createController() {
            return $controller('NodesController', {
                nodeService: nodeService
            });
        }
    });
})();