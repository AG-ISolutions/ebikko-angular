(function() {
    "use strict";

    describe("Unit tests for the NodesController", function() {
        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.nodes'));

        var nodesService, tabService, nodesController;

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function(num) {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function(_$controller_) {
            nodesService = jasmine.createSpyObj('nodesService', ['getRecentRecords', 'getSavedSearch', 'textSearch', 'documentSearch', 'getContentUrl']);
            tabService = jasmine.createSpyObj('tabService', ['addTab']);
            nodesController = _$controller_('NodesController', {
                nodesService: nodesService,
                tabService: tabService
            });
        }));

        it("should get recent records when type is recent-records", function() {
            nodesController.type = 'recent-records';

            nodesController.activate();

            expect(nodesService.getRecentRecords).toHaveBeenCalled();
        });

        it("should get saved search when type is saved-search", function() {
            nodesController.type = 'saved-search';
            nodesController.typeId = '123';

            nodesController.activate();

            expect(nodesService.getSavedSearch).toHaveBeenCalledWith('123');
        });

        it("should perform text search when type is search", function() {
            nodesController.type = 'search';
            nodesController.typeId = 'search query';

            nodesController.activate();

            expect(nodesService.textSearch).toHaveBeenCalledWith('search query');
        });

        it("should perform uid search when type is uid-search", function() {
            nodesController.type = 'uid-search';
            nodesController.typeId = "123";

            nodesController.activate();

            expect(nodesService.documentSearch).toHaveBeenCalledWith("123");
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

        it("should default the start and page size", function() {
            nodesController.activate();

            expect(nodesController.start).toEqual(0);
            expect(nodesController.limit).toEqual(25);
        });

        it("should update the start number and call the service again when next is called", function() {
            nodesController.type = 'recent-records';
            nodesController.activate();
            nodesController.dynamic_params = jasmine.createSpyObj('dynamic_params', ['refresh']);

            nodesController.next();

            expect(nodesService.getRecentRecords).toHaveBeenCalledWith(25, 25);
            expect(nodesController.dynamic_params.refresh).toHaveBeenCalled();
        });

        it("should update the start number and call the service again when previous is called", function() {
            nodesController.type = 'recent-records';
            nodesController.activate();
            nodesController.start = 25;
            nodesController.limit = 25;
            nodesController.dynamic_params = jasmine.createSpyObj('dynamic_params', ['refresh']);

            nodesController.previous();

            expect(nodesService.getRecentRecords).toHaveBeenCalledWith(0, 25);
            expect(nodesController.dynamic_params.refresh).toHaveBeenCalled();
        });

        it("should add tab for the nodes properties", function() {
            var node = {
                node_id: '123',
                _is_leaf: true
            };

            nodesController.viewProperties(node);

            expect(tabService.addTab).toHaveBeenCalled();
        });

    });
})();