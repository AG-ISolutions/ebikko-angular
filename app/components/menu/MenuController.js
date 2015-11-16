(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('MenuController', ['$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService', 'tabService',
            MenuController
        ])

    function MenuController($mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService, tabService) {
        var self = this;

        self.selectMenuItem = function(menuItem) {
            tabService.addTab(menuItem);        
            self.toggleSidebar();
        }

        self.selectTab = function(tab){
            tabService.selectTab(tab);
        }

        self.toggleSidebar = function() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }

        self.logout = function() {
            loginService.logout()
                .then(function(data) {
                    $location.url("/");
                });
        }

        var originatorEv;
        self.openSettings = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        }

        self.showChangePassword = function(ev) {
            $mdDialog.show({
                controller: 'changePasswordController',
                controllerAs: 'cpc',
                templateUrl: './components/menu/changePassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        self.tabs = tabService.getTabs();
        self.getSelectedTab = function() {
            return tabService.getSelectedTab();
        }

        self.menuItems = [{
            'name': 'All Meetings',
            'content': "<nodes type='saved-search' type-id='f220cd0300c843b5b3ee6d969a464478'/>",
        }, {
            'name': 'Recent Records',
            'content': "<nodes type='recent-records'/>"
        }];
    }
})();