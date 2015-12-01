(function() {
    "use strict";

    angular
        .module('ebikko.node-properties')
        .directive('nodeProperties', function() {
            return {
                scope: {
                    'nodeId': '@'
                },
                controller: 'NodePropertiesController',
                controllerAs: 'nodeProperties',
                bindToController: true,
                templateUrl: './components/node-properties/nodeProperties.html'
            };
        });
})();