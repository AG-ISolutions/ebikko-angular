(function() {
	"use strict";

	angular
		.module('ebikko.select-node-type')
		.controller('SelectNodeTypeController', [ 'selectNodeTypeService', SelectNodeTypeController ]);

	function SelectNodeTypeController(selectNodeTypeService) {
		var self = this;
		self.activate = activate;

		function activate() {
			selectNodeTypeService.getNodeTypes().then(function(response){
				self.nodeTypes = response.data.results;
			});
		}
	}

})();