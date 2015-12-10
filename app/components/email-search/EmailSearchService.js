(function() {
    "use strict";

    angular
        .module('ebikko.email-search')
        .service('emailSearchService', ['$http', 'userRepository', EmailSearchService]);

    function EmailSearchService($http, userRepository) {
        var self = {
            search: search
        };

        return self;

        function search(value) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                "method": "FILTER",
                "predicate": {
                    "op": "ALL",
                    "val": [{
                        "op": "NOT",
                        "val": {
                            "op": "EMAIL",
                            "val": null
                        }
                    }, {
                        "op": "ANY",
                        "val": [{
                            "op": "EMAIL",
                            "val": "*" + value + "*"
                        }, {
                            "op": "NAME",
                            "val": "*" + value + "*"
                        }]
                    }]
                }
            };
            var stringed = JSON.stringify(json);
            return $http({
                method: 'POST',
                url: '/Principal?json=' + stringed + '&start=0&limit=10'
            });
        }
    }
})();