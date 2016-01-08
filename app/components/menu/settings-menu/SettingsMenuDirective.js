(function() {
	"use strict";

	angular
		.module('ebikko.settings-menu')
        .directive('ebikkoSettingsMenu', function() {
            return {
	        	controller: 'SettingsMenuController',
	        	controllerAs: 'smc',
	        	bindToController: true,
                templateUrl: './components/menu/settings-menu/settingsMenu.html'
            };
        });
})();