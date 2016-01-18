(function() {
    "use strict";

    angular
        .module('ebikko.node-properties')
        .service('nodePropertiesResultsProcessor', ['$filter', 'nodeTypeService', NodePropertiesResultsProcessor]);

    function NodePropertiesResultsProcessor($filter, nodeTypeService) {
        var self = {
            enrichWithValues: enrichWithValues,
        };

        return self;

        function enrichWithValues(nodeDetails, nodeTypeDetails) {
            var results = nodeTypeService.processNodeTypeDetails(nodeTypeDetails);
            var nodeProperties = nodeDetails.single_value;

            angular.forEach(results, function(result, key) {
                if (result.isCustomProperty) {
                    result.value = extractCustomPropertyValue(result.isMultiValue, result.id, nodeDetails);
                } else {
                    result.value = nodeDetails[getPropertyKey(result.id)];
                }
            });

            return results;
        }

        function extractCustomPropertyValue(isMultiValue, propertyId, node) {
            var value;
            var matchingPropertyValues = findInArray(isMultiValue ? node.multi_values : node.single_value, propertyId);
            if (isMultiValue) {
                value = [];
                angular.forEach(matchingPropertyValues[0].values, function(property, key) {
                    value.push(property.value);
                });
            } else {
                value = processPropertyValue(matchingPropertyValues[0]);
            }
            return value;
        }

        function findInArray(array, value) {
            return $filter('filter')(array, {
                'property_id': value
            }, true);
        }

        function getPropertyKey(propertyId) {
            return staticProperties()[propertyId];
        }

        function processPropertyValue(property) {
            if (property.property_type == 1200) {
                return property.value.split(',')[1];
            } else {
                return property.value;
            }
        }

        function staticProperties() {
            return {
                1: 'title',
                3: 'notes',
                4: 'record_number',
                6: 'container_record_number'
            };
        }
    }
})();