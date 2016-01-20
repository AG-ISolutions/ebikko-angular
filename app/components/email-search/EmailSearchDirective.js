(function() {
    'use strict';

    angular
        .module('ebikko.email-search')
        .directive('ebikkoEmailSearch', function() {
            return {
            	scope: {
            		'model': '=',
                    'label': '@',
                    'multiValue': '@',
                    'mustBeMemberOf': '@',
                    'requireEmail': '@',
                    'restrictToGroups': '@',
                    'restrictToPeople': '@'
            	},
	        	controller: 'EmailSearchController',
	        	controllerAs: 'esc',
	        	bindToController: true,
                templateUrl: 'components/email-search/emailSearch.html'
            };
        });
})();