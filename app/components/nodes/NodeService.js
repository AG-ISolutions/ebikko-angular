(function() {
    'use strict';

    angular
        .module('ebikko.nodes')
        .service('nodeService', ['$http', '$q', 'userRepository', 'ebikkoConfig',
            NodeService
        ]);

    function NodeService($http, $q, userRepository, config) {
        var self = this;
        self.defaultColumns = [22, 12, 1, 4, 10, 4.1];
        self.defaultStart = 0;
        self.defaultLimit = 25;

        self.getRecentRecords = function() {
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

        self.getSavedSearch = function(searchId, parentId) {
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
            })
        }
    }
})();