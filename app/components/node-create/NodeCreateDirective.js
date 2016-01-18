(function() {
    "use strict";

    angular
        .module('ebikko.node-create')
        .directive('ebikkoNodeCreate', function() {
            return {
                scope: {
                    'nodeTypeId': '@'
                },
                controller: 'NodeCreateController',
                controllerAs: 'ncc',
                bindToController: true,
                templateUrl: './components/node-create/nodeCreate.html'
            };
        });
})();