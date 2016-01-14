(function() {
    "use strict";

    angular
        .module('ebikko.node-menu')
        .controller('NodeMenuController', ['$http', '$mdDialog', '$scope', 'nodeService', 'tabService', 'userRepository', NodeMenuController]);

    function NodeMenuController($http, $mdDialog, $scope, nodeService, tabService, userRepository) {
        var self = this;
        self.activate = activate;
        self.attemptCall = attemptCall;
        self.hasEmail = hasEmail;
        self.hasProfilePermission = hasProfilePermission;
        self.openTabMenu = openTabMenu;
        self.showEmailRecord = showEmailRecord;
        self.showSecureShare = showSecureShare;

        activate();

        function activate() {
            $scope.$on('tabSelected', function(ev, tab) {
                if (tab.type === 'node') {
                    self.downloadUrl = "";
                    self.filename = "";
                    self.counter = 0;
                    self.attemptCall(tab);
                }
            });
        }

        // On Chrome on an iPad the http call for the download url intermittently fails, the only solution I could find was just to retry
        function attemptCall(tab) {
            nodeService.getDownloadUrl(tab.id).then(function(response) {
                var url = response.data.data.contentUrl;
                self.downloadUrl = url.substring(url.indexOf('/downloadURL'));
                self.filename = tab.file_name;
            }, function(response) {
                self.counter++;
                if (self.counter < 20) {
                    self.attemptCall(tab);
                }
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