(function() {
	"use strict";

	angular
		.module('ebikko.node-create')
		.service('nodeCreateService', [ '$http', 'userRepository', NodeCreateService ]);

	function NodeCreateService($http, userRepository) {
		var self = {
		};

		return self;
	}
})();