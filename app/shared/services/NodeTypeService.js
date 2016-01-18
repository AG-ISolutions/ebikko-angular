(function() {
    'use strict';

    angular
        .module('ebikko.shared-services')
        .service('nodeTypeService', ['$http', '$filter', 'userRepository', NodeTypeService]);

    function NodeTypeService($http, $filter, userRepository) {
        var self = {
            getNodeTypeDetails: getNodeTypeDetails,
            processNodeTypeDetails: processNodeTypeDetails
        };

        return self;

        function getNodeTypeDetails(nodeTypeId) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'NODETYPE_PROPERTIES',
                'node_type_id': nodeTypeId,
                'container_id': 'undefined'
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/NodeType?json=' + stringed
            });
        }

        function processNodeTypeDetails(nodeTypeDetails) {
            var propertyGroups = nodeTypeDetails.property_group;
            var customProperties = nodeTypeDetails.properties;
            var attributes = nodeTypeDetails.attributes;

            var results = [];
            angular.forEach(propertyGroups, function(propertyGroup, key) {
                var propertyId = propertyGroup.property_id;
                var isMultiValue = customProperties && extractValueFromArray(customProperties, propertyId, 'is_multi_value');
                var isCustomProperty = isMultiValue !== null && isMultiValue !== undefined;
                var type = isCustomProperty ? extractValueFromArray(customProperties, propertyId, 'type') : null;

                var result = {
                    id: propertyId,
                    isCustomProperty: isCustomProperty,
                    isMultiValue: isCustomProperty && isMultiValue,
                    type: type
                };

                result.name = extractValueFromArray(attributes, isNaN(propertyId) ? propertyId : parseInt(propertyId), 'alias');
                if (result.name === null || result.name === '') {
                    result.name = decodeURIComponent(propertyGroup.name);
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
            return $filter('filter')(array, {
                'property_id': value
            }, true);
        }
    }
})();