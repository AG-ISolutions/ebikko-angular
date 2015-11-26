(function() {
    "use strict";

    describe("Unit tests for the NodesController", function() {
        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.nodes'));

        var nodeService = jasmine.createSpyObj('nodeService', ['getRecentRecords', 'getSavedSearch', 'search', 'getContentUrl']);
        var tabService;
        var nodesController;

        beforeEach(inject(function(_$controller_) {
            tabService = jasmine.createSpyObj('tabService', ['addTab']);
            nodesController = _$controller_('NodesController', {
                nodeService: nodeService,
                tabService: tabService
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

        it("should add tab when selecting a leaf node with electronic content", function() {
            var node = {
                _is_leaf: true,
                is_electronic: true
            };

            nodesController.selectNode(node);

            expect(tabService.addTab).toHaveBeenCalled();
        });

        it("should not add tab when the record is a leaf node but without electronic content", function() {
            var node = {
                _is_leaf: true,
                is_electronic: false
            };

            nodesController.selectNode(node);

            expect(tabService.addTab).not.toHaveBeenCalled();
        });

        it("should not add tab when the record is not a leaf node", function() {
            var node = {
                _is_leaf: false,
                is_electronic: true
            };

            nodesController.selectNode(node);

            expect(tabService.addTab).not.toHaveBeenCalled();
        });

        function createController() {
            return $controller('NodesController', {
                nodeService: nodeService
            });
        }
    });
})();