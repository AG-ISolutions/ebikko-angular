(function() {
	"use strict";

	angular
		.module('ebikko.select-node-type')
		.service('selectNodeTypeService', [ '$http', 'userRepository', SelectNodeTypeService ]);

	function SelectNodeTypeService($http, userRepository) {
		var self = {
			getNodeTypes: getNodeTypes
		};

		return self;

		function getNodeTypes() {
			var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'NODETYPE_USABLE_LIST',
                'node_type_id': ''
			};
			var stringed = JSON.stringify(json);
			return $http({
				'method': 'GET',
				'url': '/NodeType?json=' + stringed
			});
		}
	}
})();