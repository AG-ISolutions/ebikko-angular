(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .controller('NodesController', ['$routeParams', 'nodeService', 'ngTreetableParams',
            NodesController
        ]);

    function NodesController($routeParams, nodeService, ngTreetableParams) {
        var self = this;

        self.type = $routeParams.type;
        var promise;

        switch (self.type) {
            case 'recent-records':
                promise = nodeService.getRecentRecords();
                break;
            case 'saved-search':
                promise = nodeService.getSavedSearch($routeParams['type-id']);
                nodeService.searchId = $routeParams['type-id'];
                break;
            default:
                break;
        }

        nodeService.tableDataPromise = promise;
    }
})();