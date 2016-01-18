(function() {
	"use strict";

	angular
		.module('ebikko.node-create')
		.controller('NodeCreateController', [ 'nodeTypeService', 'nodeCreateService', NodeCreateController ]);

	function NodeCreateController(nodeTypeService, nodeCreateService) {
		var self = this;
		self.activate = activate;
		self.loading = false;

		activate();

		function activate() {
			self.loading = true;
			nodeTypeService.getNodeTypeDetails(self.nodeTypeId).then(function(response) {
				self.nodeTypeProperties = nodeTypeService.processNodeTypeDetails(response.data.results[0]);
				self.loading = false;
			});
		}
	}

})();