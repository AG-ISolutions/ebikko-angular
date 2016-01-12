(function() {
    'use strict';

    angular
        .module('ebikko.shared-services')
        .service('nodeService', ['$http', 'userRepository', NodeService ]);

    function NodeService($http, userRepository) {
        var self = {
            getDownloadUrl: getDownloadUrl
        };

        return self;

        function getDownloadUrl(nodeId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'CONTENT_DOWNLOAD',
                'node_id': nodeId,
                'version': 1
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/Content',
                'params': {
                    'json': json
                }
            });
        }
    }
})();