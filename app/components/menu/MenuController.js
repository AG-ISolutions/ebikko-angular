(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('MenuController', ['$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService', 'menuService',
            MenuController
        ])

    function MenuController($mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService, menuService) {
        var self = this;
        self.selectedMenuItem = {};

        self.selectMenuItem = function(menuItem) {
            menuService.selectMenuItem(menuItem);
            self.toggleSidebar();
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
                templateUrl: '/components/menu/changePassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }

        self.tabs = menuService.getTabs();
        self.menuItems = menuService.getMenuItems();
        self.selectedMenuItem = menuService.getSelectedMenuItem();
    }
})();