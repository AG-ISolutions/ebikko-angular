(function() {
    "use strict";

    angular
        .module('ebikko.node-create')
        .service('nodeCreateService', ['$http', 'userRepository', NodeCreateService]);

    function NodeCreateService($http, userRepository) {
        var self = {
            enrichWithModelNames: enrichWithModelNames,
            loadContainers: loadContainers,
            saveNode: saveNode
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