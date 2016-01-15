(function() {
    "use strict";

    angular
        .module('ebikko.node-menu')
        .controller('NodeMenuController', [ '$mdDialog', 'nodeService', 'tabService', 'userRepository', NodeMenuController]);

    function NodeMenuController($mdDialog, nodeService, tabService, userRepository) {
        var self = this;
        self.downloadContent = downloadContent;
        self.hasEmail = hasEmail;
        self.hasProfilePermission = hasProfilePermission;
        self.openTabMenu = openTabMenu;
        self.showEmailRecord = showEmailRecord;
        self.showSecureShare = showSecureShare;

        function downloadContent() {
            var tab = tabService.getSelectedTab();
            nodeService.getDownloadUrl(tab.id).then(function(response) {
                window.open(response.data.data.url, '_blank', '');
            });
        }

        function hasEmail() {
            return userRepository.getPrincipalDetails() && userRepository.getPrincipalDetails().results[0].email;
        }

        function hasProfilePermission(permissionId) {
            return userRepository.hasProfilePermission(permissionId);
        }

        function openTabMenu($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
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
    }
})();