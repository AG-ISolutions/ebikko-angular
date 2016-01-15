(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('MenuController', ['$document', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$mdToast', '$location', 'loginService', 'tabService', 'nodeService', 'userRepository',
            'menuService', MenuController
        ]);

    function MenuController($document, $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast, $location, loginService, tabService, nodeService, userRepository, menuService) {
        var self = this;

        self.getSelectedTab = getSelectedTab;
        self.logout = logout;
        self.openSettings = openSettings;
        self.quickSearch = quickSearch;
        self.selectMenuItem = selectMenuItem;
        self.showChangePassword = showChangePassword;
        self.toggleFullscreen = toggleFullscreen;
        self.viewNodeCreateDialog = viewNodeCreateDialog;

        self.showSearch = false;

        self.toggleSidebar = toggleSidebar;

        self.activate = function() {
            menuService.getMenuItems().then(function(menuItems) {
                self.menuItems = menuItems;
            });
        };

        function getSelectedTab() {
            return tabService.getSelectedTab();
        }

        function refreshIframe() {
            setTimeout(function() {
                var elem = document.querySelector('md-tab-content.md-active iframe');
                if (elem) {
                    elem.contentWindow.location.reload(true);
                }
            }, 250);
        }

        function selectMenuItem(menuItem) {
            tabService.addTab(menuItem);
            self.toggleSidebar();
        }

        function toggleFullscreen() {
            var inFullScreen = tabService.toggleFullscreen();
            if (inFullScreen) {
                $document.bind('keydown', function(event) {
                    if (event.keyCode == 27) {
                        tabService.toggleFullscreen();
                        $mdToast.cancel();
                        refreshIframe();
                        $document.unbind('keydown');
                    }
                });

                refreshIframe();

                var toast = $mdToast.simple()
                    .textContent('Fullscreen mode')
                    .action('Close')
                    .highlightAction(false)
                    .position('bottom right')
                    .hideDelay(0);

                $mdToast.show(toast).then(function(response) {
                    tabService.toggleFullscreen();
                    refreshIframe();
                    $document.unbind('keydown');
                });
            }
        }

        function toggleSidebar() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }

        function logout() {
            loginService.logout();
        }

        function openSettings($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        function quickSearch() {
            if (!(self.searchQuery === null || self.searchQuery === undefined || self.searchQuery === '')) {
                tabService.addTab({
                    name: 'Search',
                    type: 'nodes',
                    content: "<nodes type='search' type-id='" + self.searchQuery + "' />"
                });
                self.showSearch = false;
            }
        }

        function showChangePassword(ev) {
            $mdDialog.show({
                controller: 'ChangePasswordController',
                controllerAs: 'cpc',
                templateUrl: './components/change-password/changePassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        function viewNodeCreateDialog(ev) {
            $mdDialog.show({
                controller: 'SelectNodeTypeController',
                controllerAs: 'sntc',
                templateUrl: './components/node-create/select-node/selectNodeType.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    }

})();