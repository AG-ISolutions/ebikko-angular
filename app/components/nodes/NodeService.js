(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .service('nodeService', ['$http', 'userRepository', 'ebikkoConfig',
            NodeService
        ]);

    function NodeService($http, userRepository, config) {
        var self = {
            defaultColumns: [22, 12, 1, 4, 10, 4.1],
            defaultStart: 0,
            defaultLimit: 25,

            getContentUrl: getContentUrl,
            getDownloadUrl: getDownloadUrl,
            getRecentRecords: getRecentRecords,
            getSavedSearch: getSavedSearch,

            search: search
        };

        return self;

        function getContentUrl(nodeId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'CONTENT_VIEW',
                'node_id': nodeId,
                'version': 0,
                'is_html5_viewer': false
            };
            var stringed = JSON.stringify(json);
            return config.basePath + '/docviewer/Content?json=' + stringed;
        }

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
                'url': config.basePath + '/Content',
                'params': {
                    'json': json
                }
            }).then(function(response) {
                return response.data.data.url;
            });
        }

        function getRecentRecords() {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'selected_columns': self.defaultColumns,
                'method': 'RECENTLY_UPDATED'
            };
            return $http({
                'method': 'GET',
                'url': config.basePath + '/NodeListing',
                'params': {
                    'json': json,
                    'limit': self.defaultLimit,
                    'start': self.defaultStart
                }
            }).then(function(response) {
                return response.data.results;
            });
        }

        function getSavedSearch(searchId, parentId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'selected_columns': self.defaultColumns,
                'method': 'SEARCH',
                'saved_search_id': searchId,
                'selected_saved_search_id': searchId,
                'search_id': searchId
            };
            return $http({
                'method': 'GET',
                'url': config.basePath + '/NodeListing',
                'params': {
                    'json': json,
                    'limit': self.defaultLimit,
                    'start': self.defaultStart,
                    'anode': parentId ? parentId : ''
                }
            }).then(function(response) {
                return response.data.results;
            });
        }

        function search(searchString) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'SEARCH',
                'search_method': 'TEXT_SEARCH',
                'selected_columns': self.defaultColumns,
                'query': searchString
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': config.basePath + '/NodeListing?json=' + stringed +
                    '&limit=' + self.defaultLimit + '&start=' + self.defaultStart
            }).then(function(response) {
                return response.data.results;
            });
        }
    }
})();