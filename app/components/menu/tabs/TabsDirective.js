(function() {
	"use strict";

	angular
		.module('ebikko.tabs')
        .directive('ebikkoTabs', function() {
            return {
	        	controller: 'TabsController',
	        	controllerAs: 'tc',
	        	bindToController: true,
                templateUrl: './components/menu/tabs/tabs.html'
            };
        });
})();