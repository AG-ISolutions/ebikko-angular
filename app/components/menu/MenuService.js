(function() {
    "use strict";

    angular
        .module('ebikko.menu')
        .service('menuService', ['$http', 'userRepository', MenuService]);

    function MenuService($http, userRepository) {
        var self = {
            getMenuItems: getMenuItems,
            getNodeTypes: getNodeTypes
        };

        return self;

        function getMenuItems() {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': 'ADMIN_GET_GADGETS',
                'profile_id': userRepository.getPrincipalDetails().results[0].profile_id
            };
            var stringed = JSON.stringify(json);
            return $http({
                'method': 'GET',
                'url': '/Gadget?json=' + stringed
            }).then(function(response) {
                var menuItems = [];

                angular.forEach(response.data.Portlets, function(portlet, key) {
                    if (portlet.columnType === 'SAVEDSEARCH') {
                        menuItems.push({
                            'name': portlet.title,
                            'type': 'nodes',
                            'content': "<nodes type='saved-search' type-id='" + portlet.columnDetails + "'/>",
                            'id': portlet.id
                        });
                    }
                });

                menuItems.push({
                    'name': 'Recent Records',
                    'type': 'nodes',
                    'content': "<nodes type='recent-records'/>",
                    'id': 'recent-records'
                });

                return menuItems;
            });
        }

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