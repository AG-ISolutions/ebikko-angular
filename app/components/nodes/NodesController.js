(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .controller('NodesController', ['nodeService', 'ngTreetableParams',
            NodesController
        ]);

    function NodesController(nodeService, ngTreetableParams) {
        var self = this;
        var promise;

        switch (self.type) {
            case 'recent-records':
                promise = nodeService.getRecentRecords();
                break;
            case 'saved-search':
                promise = nodeService.getSavedSearch(this.typeId);
                nodeService.searchId = this.typeId;
                break;
            default:
                break;
        }

        self.dynamic_params = new ngTreetableParams({
            getNodes: function(parent) {
                return parent ? nodeService.getSavedSearch(nodeService.searchId, parent._id).then(returnResponse) : promise.then(returnResponse);
            },
            getTemplate: function(node) {
                return 'tree_node';
            }
        });

        function returnResponse(data) {
            return data;
        }
    }
})();