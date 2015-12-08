(function() {
	"use strict";

	angular
		.module('ebikko.node-menu')
        .directive('ebikkoNodeMenu', function() {
            return {
	        	controller: 'NodeMenuController',
	        	controllerAs: 'nmc',
	        	bindToController: true,
                templateUrl: './components/menu/node-menu/nodeMenu.html'
            };
        });
})();