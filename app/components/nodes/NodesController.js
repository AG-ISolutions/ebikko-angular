(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .controller('NodesController', ['nodeService', 'ngTreetableParams', 'tabService',
            NodesController
        ]);

    function NodesController(nodeService, ngTreetableParams, tabService) {
        var self = this;

        self.activate = activate;
        self.dynamic_params = new ngTreetableParams({ // jshint ignore:line
            getNodes: function(parent) {
                return parent ? 
                    nodeService.getSavedSearch(self.typeId, parent._id).then(returnResponse) : 
                    promise.then(returnResponse);
            },
            getTemplate: function(node) {
                return 'tree_node';
            },
            options: {
                clickableNodeNames: true,
                expanderTemplate: "<svg class='spinner' width='20px' height='20px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>" +
                    "<circle class='path' fill='none' stroke-width='6' stroke-linecap='round' cx='33' cy='33' r='30'></circle>" +
                    "</svg>" +
                    "<a href='#'>&nbsp;</a>"
            }
        });
        self.selectNode = selectNode;

        var promise;

        self.activate();

        function activate() {
            switch (self.type) {
                case 'recent-records':
                    promise = nodeService.getRecentRecords();
                    break;
                case 'saved-search':
                    promise = nodeService.getSavedSearch(self.typeId);
                    break;
                case 'search':
                    promise = nodeService.search(self.typeId);
                    break;
                default:
                    break;
            }
        }

        function returnResponse(data) {
            return data;
        }

        function selectNode(node) {
            if (node._is_leaf) {
                tabService.addTab({
                    name: node.title,
                    type: 'node',
                    id: node.node_id,
                    title: node.title,
                    file_name: node.file_name,
                    content: "<iframe src='" + nodeService.getContentUrl(node.node_id) + "'/>'"
                });
            }
        }
    }
})();