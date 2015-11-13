(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .controller('MenuController', ['$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService',
            MenuController
        ])

    function MenuController($mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService) {
        var self = this;
        self.title = "Ebikko";

        self.selectedMenuItem = {};
        self.tabs = [];

        self.menuItems = [{
            'name': 'All Meetings',
            'content': "<nodes type='saved-search' type-id='ia4065fe384245cc85e0670b7bb10c15'/>",
        }, {
            'name': 'Recent Records',
            'content': "<nodes type='recent-records'/>"
        }];

        self.selectMenuItem = function(menuItem) {
            if (this.selectedMenuItem !== menuItem) {
                var currentIndex = this.tabs.indexOf(menuItem);
                if (currentIndex > -1) {
                    this.tabs.splice(currentIndex, 1);
                }
                this.tabs.push(menuItem);
                this.selectTab(menuItem);
            }
            this.toggleSidebar();
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

        self.selectTab = function(menuItem) {
            if (this.selectedMenuItem !== menuItem) {
                this.title = menuItem.name;
                this.selectedMenuItem = menuItem;
            }
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
    }
})();