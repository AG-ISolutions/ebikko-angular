(function() {
    'use strict';

    angular
        .module('ebikko.menu', ['ngMaterial', 
        	'ebikko.config', 'ebikko.users', 'ebikko.login', 'ebikko.nodes', 'ebikko.secure-share', 'ebikko.change-password', 
        	'ebikko.email-record', 'ebikko.tabs', 'ebikko.shared-services']);

})();