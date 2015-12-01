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

            var propertyGroups = nodeTypeDetails.data.results[0].property_group;
            var properties = nodeTypeDetails.data.results[0].properties;
            var attributes = nodeTypeDetails.data.results[0].attributes;

            var node = nodeDetails.data.results[0];
            var nodeProperties = node.single_value;

            angular.forEach(propertyGroups, function(propertyGroup, key) {
                var propertyId = propertyGroup.property_id;
                var result = {
                    id: propertyId
                };

                result.value = extractValueFromArray(nodeProperties, propertyId, 'value');
                if (result.value === null) {
                    result.value = node[getPropertyKey(propertyId)];
                }

                result.name = extractValueFromArray(attributes, isNaN(propertyId) ? propertyId : parseInt(propertyId), 'alias');
                if (result.name === null || result.name === '') {
                    result.name = propertyGroup.name;
                }

                results.push(result);
            });

            return results;
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
            return $filter('filter')(array, { 'property_id': value}, true);
        }

        function getPropertyKey(propertyId) {
            return staticProperties()[propertyId];
        }

        function staticProperties() {
            return {
                1: 'title',
                3: 'notes',
                6: 'container_record_number'
            };
        }
    }
})();