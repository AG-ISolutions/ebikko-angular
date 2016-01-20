(function() {
    "use strict";

    angular
        .module('ebikko.node-create')
        .filter('decodeURIComponent', function() {
            return window.decodeURIComponent;
        });
})();