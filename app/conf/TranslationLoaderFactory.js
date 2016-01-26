(function() {
	"use strict";

	angular
		.module('ebikko.conf')
		.factory('translationLoaderFactory', [ '$http', TranslationLoaderFactory]);

	function TranslationLoaderFactory($http) {
		return function (options) {
			return $http({
				'method': 'GET',
				'url': '/js/language/lang-' + options.key + '.js'
			}).then(function(response) {
				response = response.data;

				// Strip out the ExtJS wrapper
				var prefix = 'language=';
				var suffix = ';LoadAppLanguage();';
				var response = response.replace(/language = /g, 'language=');
				var string = response.substring(response.indexOf(prefix) + prefix.length, response.indexOf(suffix));
				string = string.trim();

				// Convert to array
				var arrayOfArrays = eval(string);

				// Iterate and build map
				var output = {};
				angular.forEach(arrayOfArrays, function(value, key){
					output[value[0]] = value[1];
				});

				return output;
			});
		}

	}
})();