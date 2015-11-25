(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .service('tabService', [TabService]);

    function TabService() {
        var self = {
            tabs: [],
            selectedTab: {},

            addTab: addTab,
            clearTabs: clearTabs,
            getSelectedTab: getSelectedTab,
            getTabs: getTabs,
            selectTab: selectTab,
            removeTab: removeTab
        };

        return self;

        function addTab(tab) {
            if (self.selectedTab !== tab) {

                var currentIndex = self.tabs.indexOf(tab);
                if (currentIndex > -1) {
                    self.tabs.splice(currentIndex, 1);
                }

                self.tabs.push(tab);
                self.selectedTab = tab;
            }
        }

        function clearTabs() {
            self.tabs = [];
            self.selectedTab = {};
        }

        function getSelectedTab() {
            return self.selectedTab;
        }

        function getTabs() {
            return self.tabs;
        }

        function selectTab(tab) {
            var currentIndex = self.tabs.indexOf(tab);
            if (currentIndex > -1 && self.selectedTab !== tab) {
                self.selectedTab = self.tabs[currentIndex];
            }
        }

        function removeTab(tab) {
            var currentIndex = self.tabs.indexOf(tab);
            if (currentIndex > -1) {
                self.tabs.splice(currentIndex, 1);
                if (self.tabs.length > 0) {
                    self.selectedTab = self.tabs[currentIndex > 0 ? currentIndex - 1 : currentIndex];
                } else {
                    self.selectedTab = {};
                }
            }
        }
    }
})();