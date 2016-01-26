(function() {
    'use strict';

    angular
        .module('ebikko.node-content')
        .service('nodeContentService', ['$http', 'userRepository', NodeContentService ]);

    function NodeContentService($http, userRepository) {
        var self = {
            getContentUrl: getContentUrl
        };

        return self;

        function getContentUrl(nodeId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'CONTENT_VIEW',
                'node_id': nodeId,
                'version': 0,
                'is_html5_viewer': true
            };
            var stringed = JSON.stringify(json);
            return '/docviewer/Content?json=' + stringed;
        }
    }
})();