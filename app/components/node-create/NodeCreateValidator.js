(function() {
    "use strict";

    angular
        .module('ebikko.node-create')
        .service('nodeCreateValidator', ['validationUtils', '$filter', NodeCreateValidator]);

    function NodeCreateValidator(validationUtils, $filter) {
        var self = {
            validate: validate
        };

        return self;

        function validate(node, nodeDetails) {

            var errors = [];

            validationUtils.errorMessageIfUndefined(node.title, displayValue(nodeDetails, "title"), errors);

            if (nodeDetails) {
                nodeDetails.forEach(function(nodeDetail, index) {
                    if (nodeDetail.isCustomProperty && nodeDetail.properties.is_mandatory) {
                        if (node.data) {
                            validationUtils.errorMessageIfUndefined(node.data[nodeDetail.id], displayValue(nodeDetails, nodeDetail.id), errors);
                        } else {
                            validationUtils.errorMessageIfUndefined(null, displayValue(nodeDetails, nodeDetail.id), errors);
                        }
                    }
                });
            }

            return {
                errors: errors,
                hasErrors: errors.length > 0
            };
        }

        function displayValue(nodeDetails, attribute) {
            var results = findInArray(nodeDetails, attribute);
            if (results && results.length > 0) {
                return results[0].name;
            } else {
                return attribute;
            }
        }

        function findInArray(array, value) {
            return $filter('filter')(array, {
                'modelName': value
            }, true);
        }
    }
})();