(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .controller('NodesController', ['nodesService', 'ngTreetableParams', 'tabService',
            NodesController
        ]);

    function NodesController(nodesService, ngTreetableParams, tabService) {
        var self = this;

        self.activate = activate;
        self.next = next;
        self.previous = previous;
        self.selectNode = selectNode;
        self.viewProperties = viewProperties;

        var promise;

        self.activate();

        function activate() {
            self.start = 0;
            self.limit = 25;

            loadData();

            self.dynamic_params = new ngTreetableParams({ // jshint ignore:line
                getNodes: function(parent) {
                    return parent ?
                        nodesService.getSavedSearch(self.typeId, parent._id).then(function(data) {
                            return extractResults(data, false);
                        }) :
                        promise.then(function(data) {
                            self.pageLoading = false;
                            return extractResults(data, true);
                        }, function(data) {
                            self.pageLoading = false;
                            self.count = 0;
                        });
                },
                getTemplate: function(node) {
                    return 'tree_node';
                },
                options: {
                    clickableNodeNames: true,
                    column: 1,
                    expanderTemplate: "<svg class='spinner' width='20px' height='20px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>" +
                        "<circle class='path' fill='none' stroke-width='6' stroke-linecap='round' cx='33' cy='33' r='30'></circle>" +
                        "</svg>" +
                        "<a href='#'>&nbsp;</a>"
                }
            });
        }

        function loadData() {
            self.pageLoading = true;
            switch (self.type) {
                case 'recent-records':
                    promise = nodesService.getRecentRecords(self.start, self.limit);
                    break;
                case 'saved-search':
                    promise = nodesService.getSavedSearch(self.typeId);
                    break;
                case 'search':
                    promise = nodesService.textSearch(self.typeId);
                    break;
                case 'document-search':
                    promise = nodesService.documentSearch(self.typeId);
                    break;
                case 'uid-search':
                    promise = nodesService.uidSearch(angular.isArray(self.typeId) ? self.typeId : [self.typeId]);
                    break;
                default:
                    break;
            }
        }

        function next() {
            self.start = self.start + self.limit;
            loadData();
            self.dynamic_params.refresh();
        }

        function previous() {
            self.start = self.start - self.limit;
            loadData();
            self.dynamic_params.refresh();
        }

        function extractResults(data, updateCount) {
            if (updateCount) {
                self.count = data.data.count;
            }
            return data.data.results;
        }

        function selectNode(node) {
            if (node._is_leaf && node.is_electronic) {
                tabService.addTab({
                    name: node.title,
                    type: 'node',
                    id: node.node_id,
                    title: node.title,
                    file_name: node.file_name,
                    content: "<ebikko-node-content node-id='" + node.node_id + "' />'"
                });
            }
        }

        function viewProperties(node) {
            tabService.addTab({
                name: node.title,
                type: 'node-properties',
                id: node.node_id + '-properties',
                content: "<node-properties node-id='" + node.node_id + "'/>"
            });

        }
    }
})();