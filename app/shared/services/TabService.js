(function() {
    'use strict';

    angular
        .module('ebikko.shared-services')
        .service('tabService', [TabService]);

    function TabService() {
        var self = {
            tabs: [],
            selectedTab: {},

            addTab: addTab,
            clearTabs: clearTabs,
            getSelectedTab: getSelectedTab,
            getTabs: getTabs,
            removeTab: removeTab,
            selectTab: selectTab,
            toggleFullscreen: toggleFullscreen
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

        function selectTab(tab) {
            var currentIndex = self.tabs.indexOf(tab);
            if (currentIndex > -1 && self.selectedTab !== tab) {
                self.selectedTab = self.tabs[currentIndex];
            }
        }

        function toggleFullscreen() {
            if (Object.keys(self.selectedTab).length !== 0) {
                self.selectedTab.fullscreen = !self.selectedTab.fullscreen;
            }

            return self.selectedTab.fullscreen;
        }
    }
})();