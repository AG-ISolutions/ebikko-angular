angular
    .module('ebikko.nodes')
    .controller('NodesController', ['$routeParams', 'nodeService',
        NodesController
    ]);

function NodesController($routeParams, nodeService) {
    var self = this;

    self.type = $routeParams.type;
    self.nodes = undefined; //triggers the loading message
    var promise;

    switch(self.type) {
    	case 'recent-records':
    		promise = nodeService.getRecentRecords();
    		break;
		case 'saved-search':
			promise = nodeService.getSavedSearch($routeParams['type-id']);
			break;
		default:
			alert(self.type);
			break;
    }
    
    promise.then(processResponse);

    function processResponse(data){
    	self.nodes = [].concat(data);
    };
};