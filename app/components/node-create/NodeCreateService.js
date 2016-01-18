(function() {
    "use strict";

    angular
        .module('ebikko.node-create')
        .service('nodeCreateService', ['$http', 'userRepository', NodeCreateService]);

    function NodeCreateService($http, userRepository) {
        var self = {
            enrichWithModelNames: enrichWithModelNames,
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