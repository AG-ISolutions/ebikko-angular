(function() {
    "use strict";

    angular
        .module('ebikko.node-content')
        .directive('ebikkoNodeContent', function() {
            return {
                scope: {
                    'nodeId': '@'
                },
                controller: 'NodeContentController',
                controllerAs: 'nodeContent',
                bindToController: true,
                templateUrl: './components/node-content/nodeContent.html'
            };
        });
})();