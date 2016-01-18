(function() {
    "use strict";

    angular
        .module('ebikko.node-properties')
        .service('nodePropertiesService', ['$http', 'userRepository', NodePropertiesService]);

    function NodePropertiesService($http, userRepository) {
        var self = {
            getNodeDetails: getNodeDetails
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
    }
})();