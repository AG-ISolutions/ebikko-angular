(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .service('menuService', [MenuService]);

    function MenuService() {
        var self = this;
        self.tabs = [];
        self.selectedMenuItem = {};

        self.menuItems = [{
            'name': 'All Meetings',
            'content': "<nodes type='saved-search' type-id='ia4065fe384245cc85e0670b7bb10c15'/>",
        }, {
            'name': 'Recent Records',
            'content': "<nodes type='recent-records'/>"
        }];

        self.addTab = function(tab) {
            var currentIndex = self.tabs.indexOf(tab);
            if (currentIndex > -1) {
                self.tabs.splice(currentIndex, 1);
            }
            self.tabs.push(tab);
            self.title = tab.name;
            self.selectedMenuItem = tab;
        }

        self.getSelectedMenuItem = function() {
            return self.selectedMenuItem;
        }

        self.getTabs = function() {
            return self.tabs;
        }

        self.selectMenuItem = function(menuItem) {
            if (self.selectedMenuItem !== menuItem) {
                self.addTab(menuItem);
            }
        }

        self.getMenuItems = function() {
            return self.menuItems;
        }
    }
})();