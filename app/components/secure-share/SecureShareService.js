(function() {
	"use strict";

	angular
		.module('ebikko.secure-share')
		.service('secureShareService', ['$http', '$filter', 'userRepository', SecureShareService]);

	function SecureShareService($http, $filter, userRepository) {
		var self = {
            secureShareNode: secureShareNode
		};

		return self;

        function secureShareNode(ss) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'PIN_SEND',
                'node_ids': [ss.nodeId],
                'principal_id': userRepository.getPrincipalDetails().results[0].principal_id,
                'emails': ss.emails,
                'expiry_date': $filter('date')(ss.expiry_date, "yyyy-MM-dd'T'HH:mm:ss"),
                'password': ss.password,
                'use_once_only': ss.use_once_only ? true : false,
                'subject': ss.subject,
                'message': ss.message
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'POST',
                'url': '/Pin?json='+stringed
            });
        }
	}	
})();