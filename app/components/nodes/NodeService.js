angular
    .module('ebikko.nodes')
    .service('nodeService', ['$http', '$q', 'loginService', 'ebikkoConfig',
        NodeService
    ]);

function NodeService($http, $q, loginService, config) {
    var self = this;
    self.defaultColumns = [22,12,1,4,10,4.1];
    self.defaultStart = 0;
    self.defaultLimit = 25;

    self.getRecentRecords = function() {
        var json = {
            'ebikko_session_id': loginService.getSessionId(),
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
        }).then(function(response){
        	return response.data.results;
        });
    }

    self.getSavedSearch = function(searchId) {
    	var json = {
    		'ebikko_session_id': loginService.getSessionId(),
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
				'start': self.defaultStart
    		}
    	}).then(function(response){
    		return response.data.results;
    	})
    }
}

//NodeListing?_dc=1446783517577
//&anode=&start=0&limit=20
//&json={"ebikko_session_id":"d86d6442d9ae44a4a0a990b3903a4ee5","selected_columns":[22,12,1,4,10,4.1],
//"method":"SEARCH","saved_search_id":"ia4065fe384245cc85e0670b7bb10c15",
//"selected_saved_search_id":"ia4065fe384245cc85e0670b7bb10c15",
//"search_id":"ia4065fe384245cc85e0670b7bb10c15"}
//&cache_id=45cfcffe-e658-4308-3ccf-cd63634477b9

//http://localhost:8080/ebikkoweb/
//NodeListing?json={"ebikko_session_id":"gd9d2baef01f452e8bde27ed99607260","selected_columns":[22,12,1,4,10,4.1],"method":"SEARCH"}&limit=25&start=0

