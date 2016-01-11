(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .service('nodesService', ['$http', 'userRepository', 'ebikkoConfig',
            NodesService
        ]);

    function NodesService($http, userRepository, config) {
        var self = {
            defaultColumns: [22, 12, 1, 4, 10, 4.1, 5.1],
            defaultStart: 0,
            defaultLimit: 25,

            getRecentRecords: getRecentRecords,
            getSavedSearch: getSavedSearch,

            textSearch: textSearch,
            documentSearch: documentSearch
        };

        return self;

        function getRecentRecords(start, limit) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'selected_columns': self.defaultColumns,
                'method': 'RECENTLY_UPDATED'
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': config.basePath + '/NodeListing?json=' + stringed,
                'params': {
                    'start': start,
                    'limit': limit
                }
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
            });
        }

        function textSearch(searchString) {
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
            });
        }

        function documentSearch(documentId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'email_link_id': documentId
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/EmailLink?json=' + stringed
            }).then(function(response) {
                var uids = response.data.results.map(function(node) {
                    return node.node_id;
                });

                var json = {
                    'ebikko_session_id': userRepository.getSessionId(),
                    'method': 'SEARCH',
                    'search_method': 'NODE_UIDS',
                    'node_ids': uids
                };
                var stringed = JSON.stringify(json);
                return $http({
                    'method': 'GET',
                    'url': '/NodeListing?json=' + stringed + '&limit=' + self.defaultLimit + '&start=' + self.defaultStart
                });
            });
        }
    }
})();