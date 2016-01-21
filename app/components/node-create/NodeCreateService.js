(function() {
    "use strict";

    angular
        .module('ebikko.node-create')
        .service('nodeCreateService', ['$http', 'userRepository', NodeCreateService]);

    function NodeCreateService($http, userRepository) {
        var self = {
            enrichWithModelNames: enrichWithModelNames,
            loadContainers: loadContainers,
            loadLookup: loadLookup,
            saveNode: saveNode,
            retentionSearch: retentionSearch
        };

        return self;

        function enrichWithModelNames(nodeTypeDetails) {
            angular.forEach(nodeTypeDetails, function(detail, key) {
                var modelName = detail.isCustomProperty ? detail.id : propertyModelNames[detail.id];
                detail.modelName = modelName;
            });

            return nodeTypeDetails;
        }

        function loadContainers(nodeTypeId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'RECENT_CONTAINERS',
                'node_type_id': nodeTypeId
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/Node?json=' + stringed
            });
        }

        function loadLookup(lookupId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'LOOKUPSET_ITEM_LIST',
                'lookup_id': lookupId
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/LookupSet?json=' + stringed
            });
        }

        function retentionSearch(value) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'FILTER',
                "predicate": {
                    "op": "ALL",
                    "val": [{
                        "op": "NOT",
                        "val": {
                            "op": "UID",
                            "val": null
                        }
                    }, {
                        "op": "ANY",
                        "val": [{
                            "op": "TITLE",
                            "val": "*" + value + "*"
                        }, {
                            "op": "NUMBER",
                            "val": "*" + value + "*"
                        }]
                    }]
                }
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/Retention?json=' + stringed
            });
        }

        function saveNode(node) {
            node.ebikko_session_id = userRepository.getSessionId();
            node.method = "NODE_SAVE";
            var stringed = JSON.stringify(node);
            return $http({
                'method': 'POST',
                'url': '/Node?json=' + stringed
            });
        }
    }

    var propertyModelNames = {
        1: 'title',
        3: 'notes',
        6: 'container_id'
    };
})();