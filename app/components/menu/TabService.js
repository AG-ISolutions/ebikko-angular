(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .service('tabService', ['$mdToast', TabService]);

    function TabService($mdToast) {
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

        function refreshIframe() {
            setTimeout(function() {
                var elem = document.querySelector('md-tab-content.md-active iframe');
                if (elem) {
                    elem.contentWindow.location.reload(true);
                }
            }, 250);
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
            if (self.selectedTab !== {}) {
                self.selectedTab.fullscreen = !self.selectedTab.fullscreen;

                refreshIframe();

                if (self.selectedTab.fullscreen) {
                    var toast = $mdToast.simple()
                        .textContent('Fullscreen mode')
                        .action('Close')
                        .highlightAction(false)
                        .hideDelay(0);

                    $mdToast.show(toast).then(function(response) {
                        toggleFullscreen();
                        refreshIframe();
                    });
                }
            }
        }
    }
})();