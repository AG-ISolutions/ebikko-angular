(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .controller('TreeTableController', ['$scope', '$q', 'ngTreetableParams', 'nodeService',
            TreeTableController
        ]);

    function TreeTableController($scope, $q, ngTreetableParams, nodeService) {
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
    };

})();