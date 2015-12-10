(function() {
    "use strict";

    angular
        .module('ebikko.tabs')
        .controller('TabsController', ['tabService', TabsController]);

    function TabsController(tabService) {
        var self = this;

        self.closeTab = closeTab;
        self.getSelectedTab = getSelectedTab;
        self.selectTab = selectTab;
        self.tabs = tabService.getTabs();

        function closeTab(tab) {
            tabService.removeTab(tab);
        }

        function getSelectedTab() {
            return tabService.getSelectedTab();
        }

        function selectTab(tab) {
            tabService.selectTab(tab);
        }
    }
})();