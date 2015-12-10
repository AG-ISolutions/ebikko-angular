(function() {
    'use strict';

    angular
        .module('ebikko.email-search')
        .directive('ebikkoEmailSearch', function() {
            return {
            	scope: {
            		'model': '='
            	},
	        	controller: 'EmailSearchController',
	        	controllerAs: 'esc',
	        	bindToController: true,
                templateUrl: 'components/email-search/emailSearch.html'
            };
        });
})();