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

        function search(value, args) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                "method": "FILTER",
                "predicate": {
                    "op": "ALL",
                    "val": [{
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
            if (args) {
                if (args.mustBeMemberOf) {
                    json.must_be_child_of = args.mustBeMemberOf;
                }
                if (args.requireEmail) {
                    json.predicate.val.push(predicates.REQUIRE_EMAIL);
                }
                if (args.type === 'PEOPLE') {
                    json.predicate.val.push(predicates.PEOPLE);
                }
                if (args.type === 'GROUPS') {
                    json.predicate.val.push.apply(predicates.GROUPS);
                }
            }
            var stringed = JSON.stringify(json);
            return $http({
                method: 'POST',
                url: '/Principal?json=' + stringed + '&start=0&limit=10'
            });
        }
    }

    var predicates = {
        'PEOPLE': {
            "op": "NOT",
            "val": {
                "op": "UID",
                "val": null
            }
        },
        'GROUPS': [{
            "op": "NOT",
            "val": {
                "op": "TYPE",
                "val": 5
            }
        }, {
            "op": "NOT",
            "val": {
                "op": "TYPE",
                "val": 0
            }
        }],
        'REQUIRE_EMAIL': {
            "op": "NOT",
            "val": {
                "op": "EMAIL",
                "val": null
            }
        }
    };
})();