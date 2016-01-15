(function() {
    "use strict";

    angular
        .module('ebikko.node-properties')
        .service('nodePropertiesResultsProcessor', ['$filter', NodePropertiesResultsProcessor]);

    function NodePropertiesResultsProcessor($filter) {
        var self = {
            processResults: processResults,
        };

        return self;

        function processResults(nodeDetails, nodeTypeDetails) {
            var results = [];

            var propertyGroups = nodeTypeDetails.property_group;
            var customProperties = nodeTypeDetails.properties;
            var attributes = nodeTypeDetails.attributes;

            var nodeProperties = nodeDetails.single_value;

            angular.forEach(propertyGroups, function(propertyGroup, key) {
                var propertyId = propertyGroup.property_id;
                var isMultiValue = customProperties && extractValueFromArray(customProperties, propertyId, 'is_multi_value');
                var isCustomProperty = isMultiValue !== null && isMultiValue !== undefined;

                var result = {
                    id: propertyId,
                    isMultiValue: isCustomProperty && isMultiValue
                };

                if (isCustomProperty) {
                    result.value = extractCustomPropertyValue(isMultiValue, propertyId, nodeDetails);
                } else {
                    result.value = nodeDetails[getPropertyKey(propertyId)];
                }

                result.name = extractValueFromArray(attributes, isNaN(propertyId) ? propertyId : parseInt(propertyId), 'alias');
                if (result.name === null || result.name === '') {
                    result.name = decodeURIComponent(propertyGroup.name);
                }

                results.push(result);
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

        function extractValueFromArray(array, filterValue, extractValue) {
            var matchingObjects = findInArray(array, filterValue);
            if (matchingObjects.length > 0) {
                return matchingObjects[0][extractValue];
            } else {
                return null;
            }
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