var module = angular.module('ebikko.nodes');

module.controller('NodesController', ['$routeParams', 'nodeService', 'ngTreetableParams',
    NodesController
]);

module.controller('TreeTableController', function($scope, $q, ngTreetableParams, nodeService) {
    $scope.dynamic_params = new ngTreetableParams({
        getNodes: function(parent) {
            return parent ? nodeService.getSavedSearch(nodeService.searchId, parent._id).then(returnResponse) : nodeService.tableDataPromise.then(returnResponse);
        },
        getTemplate: function(node) {
            return 'tree_node';
        },
        options: {
            onNodeExpand: function() {
                console.log('A node was expanded!');
            }
        }
    });

    function returnResponse(data) {
        return data;
    }
});

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
};