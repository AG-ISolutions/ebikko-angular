(function() {
    "use strict";

    angular
        .module('ebikko.email-search')
        .controller('EmailSearchController', ['emailSearchService', EmailSearchController]);

    function EmailSearchController(emailSearchService) {
        var self = this;
        self.mustBeMemberOf = false;
        self.performPrincipalSearch = performPrincipalSearch;
        self.requireEmail = "true";
        self.restrictToPeople = "false";
        self.restrictToGroups = "false";
        self.transformChip = transformChip;

        self.model = (self.model === undefined || self.model === null) ? [] : self.model;

        function calculateType() {
            if (isTrue(self.restrictToPeople) && isTrue(self.restrictToGroups)) {
                throw new Error("Cannot set both restrictions to true");
            }
            if (isTrue(self.restrictToPeople)) {
                return 'PEOPLE';
            }
            if (isTrue(self.restrictToGroups)) {
                return 'GROUPS';
            }
            return 'ALL';
        }

        function isTrue(str) {
            return str.toLowerCase() === "true";
        }

        function performPrincipalSearch(val) {
            var p = emailSearchService.search(val, {
                mustBeMemberOf: self.mustBeMemberOf ? self.mustBeMemberOf : false,
                type: calculateType(),
                requireEmail: isTrue(self.requireEmail)
            });
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
            };
        }
    }
})();