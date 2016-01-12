(function() {
    "use strict";

    angular
        .module('ebikko.email-search')
        .controller('EmailSearchController', ['emailSearchService', EmailSearchController]);

    function EmailSearchController(emailSearchService) {
        var self = this;
        self.performPrincipalSearch = performPrincipalSearch;
        self.transformChip = transformChip;

        self.model = (self.model === undefined || self.model === null) ? [] : self.model;

        function performPrincipalSearch(val) {
            var p = emailSearchService.search(val);
            p.then(function(response) {
                self.principals = response.data.results;
            });
            return p;
        }

        function transformChip(chip) {
            if (angular.isObject(chip)) {
                return chip;
            }

            return {
                name: chip,
                email: chip,
                type: 'new'
            }
        }
    }
})();