(function() {
	"use strict";

	angular
		.module('ebikko.forgot-password')
		.service('forgotPasswordValidator', [ 'validationUtils', ForgotPasswordValidator ]);

	function ForgotPasswordValidator(validationUtils) {
		var self = {
			validate: validate
		};

		return self;

		function validate(form) {
			
			var errors = [];
			validationUtils.errorMessageIfUndefined(form.username, "Username", errors);
			validationUtils.errorMessageIfUndefined(form.email, "Email", errors);

			if (!/(.*)@(.*)/.test(form.username)) {
				errors.push("Username must be in the format username@repo");
			}

			return {
				errors: errors,
				hasErrors: errors.length > 0
			};
		}
	}
})();