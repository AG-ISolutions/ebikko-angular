(function() {
    "use strict";

    angular
        .module('ebikko.node-properties')
        .service('nodePropertiesService', ['$http', 'userRepository', NodePropertiesService]);

    function NodePropertiesService($http, userRepository) {
        var self = {
            getNodeDetails: getNodeDetails,
            getNodeTypeDetails: getNodeTypeDetails
        };

        return self;

        function getNodeDetails(nodeId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'NODE_DETAIL_FULL',
                'node_id': nodeId
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/Node?json=' + stringed
            });
        }

        function getNodeTypeDetails(nodeTypeId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'NODETYPE_PROPERTIES',
                'node_type_id': nodeTypeId,
                'container_id': 'undefined'
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/NodeType?json=' + stringed
            });
        }
    }
})();