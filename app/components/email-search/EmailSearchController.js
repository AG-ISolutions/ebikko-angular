(function() {
    "use strict";

    angular
        .module('ebikko.email-search')
        .controller('EmailSearchController', ['emailSearchService', '$q', EmailSearchController]);

    function EmailSearchController(emailSearchService, $q) {
        var self = this;
        self.mustBeMemberOf = false;
        self.performPrincipalSearch = performPrincipalSearch;
        self.requireEmail = "true";
        self.restrictToPeople = "false";
        self.restrictToGroups = "false";
        self.transformChip = transformChip;

        activate();

        function activate() {
            if (self.multiValue === "true") {
                if (self.model === undefined || self.model === null) {
                    self.model = [];
                }
            } else {
                if (self.model === {}) {
                    self.model = null;
                }
            }
        }

        self.test = function(principal) {
            console.log('esc' + principal);
        };

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
            var deferred = $q.defer();
            emailSearchService.search(val, {
                mustBeMemberOf: self.mustBeMemberOf ? self.mustBeMemberOf : false,
                type: calculateType(),
                requireEmail: isTrue(self.requireEmail)
            }).then(function(response) {
                console.log("Found "+response.data.results.length);
                deferred.resolve(response.data.results);
            });
            return deferred.promise;
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