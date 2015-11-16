(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('MenuController', ['$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService', 'tabService',
            MenuController
        ])

    function MenuController($mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService, tabService) {
        var self = this;

        self.closeTab = closeTab;
        self.getSelectedTab = getSelectedTab;
        self.logout = logout;
        self.openSettings = openSettings;
        self.selectMenuItem = selectMenuItem;
        self.selectTab = selectTab;
        self.showChangePassword = showChangePassword;
        self.toggleSidebar = toggleSidebar;

        self.menuItems = [{
            'name': 'All Meetings',
            'content': "<nodes type='saved-search' type-id='f220cd0300c843b5b3ee6d969a464478'/>",
        }, {
            'name': 'Recent Records',
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
    }
})();