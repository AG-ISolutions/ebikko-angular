(function() {
    'use strict';
    
    angular
        .module('ebikko.config')
        .value('ebikkoConfig', {
            basePath: 'http://localhost:8083'
        });
        
})();