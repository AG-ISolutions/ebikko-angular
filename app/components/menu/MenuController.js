(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('MenuController', ['$controller', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService', 'tabService', 'nodeService', 'userRepository',
            MenuController
        ]);

    function MenuController($controller, $mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService, tabService, nodeService, userRepository) {
        var self = this;

        self.closeTab = closeTab;
        self.downloadContent = downloadContent;
        self.getSelectedTab = getSelectedTab;
        self.logout = logout;
        self.openSettings = openSettings;
        self.openTabMenu = openTabMenu;
        self.quickSearch = quickSearch;
        self.selectMenuItem = selectMenuItem;
        self.selectTab = selectTab;
        self.showChangePassword = showChangePassword;
        self.showEmailRecord = showEmailRecord;

        self.showSearch = false;
        self.hasEmail = hasEmail;

        self.showSecureShare = showSecureShare;
        self.toggleSidebar = toggleSidebar;

        self.menuItems = [{
            'name': 'All Meetings',
            'type': 'nodes',
            'content': "<nodes type='saved-search' type-id='f220cd0300c843b5b3ee6d969a464478'/>"
        }, {
            'name': 'Recent Records',
            'type': 'nodes',
            'content': "<nodes type='recent-records'/>"
        }];
        self.tabs = tabService.getTabs();

        function hasEmail() {
            return userRepository.getPrincipalDetails() && userRepository.getPrincipalDetails().results[0].email;
        }

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
                    tabService.clearTabs();
                    $location.url("/");
                });
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
                controller: 'ChangePasswordController',
                controllerAs: 'cpc',
                templateUrl: './components/change-password/changePassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        function showEmailRecord(ev) {
            $mdDialog.show({
                controller: 'EmailRecordController',
                controllerAs: 'erc',
                bindToController: true,
                locals: {
                    nodeId: tabService.getSelectedTab().id,
                    title: tabService.getSelectedTab().title,
                    file_name: tabService.getSelectedTab().file_name
                },
                templateUrl: './components/email-record/emailRecord.html',
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
            nodeService.getDownloadUrl(tab.id).then(function(url) {
                window.open(url, '_blank', '');
            });
        }
    }
})();