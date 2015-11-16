(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .directive('nodes', function() {
            return {
            	scope: {
            		'type': '@',
            		'typeId': '@'
            	},
	        	controller: 'NodesController',
	        	controllerAs: 'nodes',
	        	bindToController: true,
                templateUrl: './components/nodes/nodes.html'
            };
        });
})();