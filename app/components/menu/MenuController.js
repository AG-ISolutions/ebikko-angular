(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('MenuController', ['$controller','$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService', 'tabService', 'nodeService',
            MenuController
        ])

    function MenuController($controller, $mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService, tabService, nodeService) {
        var self = this;

        self.closeTab = closeTab;
        self.downloadContent = downloadContent;
        self.getSelectedTab = getSelectedTab;
        self.logout = logout;
        self.openSettings = openSettings;
        self.openTabMenu = openTabMenu;
        self.selectMenuItem = selectMenuItem;
        self.selectTab = selectTab;
        self.showChangePassword = showChangePassword;
        self.showSecureShare = showSecureShare;
        self.toggleSidebar = toggleSidebar;

        self.menuItems = [{
            'name': 'All Meetings',
            'type': 'nodes',
            'content': "<nodes type='saved-search' type-id='f220cd0300c843b5b3ee6d969a464478'/>",
        }, {
            'name': 'Recent Records',
            'type': 'nodes',
            'content': "<nodes type='recent-records'/>"
        }];
        self.tabs = tabService.getTabs();

        function selectMenuItem(menuItem) {
            tabService.addTab(menuItem);
            self.toggleSidebar();
        }

        function selectTab(tab) {
            tabService.selectTab(tab);
        }

        function toggleSidebar() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }

        function logout() {
            loginService.logout()
                .then(function(data) {
                    $location.url("/");
                });
        }

        function openSettings($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        function showSecureShare(ev) {
            $mdDialog.show({
                controller: 'secureShareController',
                controllerAs: 'ssc',
                bindToController: true,
                locals: {
                    nodeId: tabService.getSelectedTab().id
                },
                templateUrl: './components/secure-share/secureShare.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        function showChangePassword(ev) {
            $mdDialog.show({
                controller: 'changePasswordController',
                controllerAs: 'cpc',
                templateUrl: './components/menu/changePassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        function getSelectedTab() {
            return tabService.getSelectedTab();
        }

        function closeTab(tab) {
            tabService.removeTab(tab);
        }

        function openTabMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        function downloadContent() {
            var tab = tabService.getSelectedTab();
            nodeService.getDownloadUrl(tab.id).then(function(url){
                window.open(url, '_blank', '');
            });
        }
    }
})();