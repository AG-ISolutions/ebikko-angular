(function() {
    "use strict";

    angular
        .module('ebikko.settings-menu')
        .controller('SettingsMenuController', [ '$mdDialog', 'loginService', 'userRepository', SettingsMenuController]);

    function SettingsMenuController($mdDialog, loginService, userRepository) {
        var self = this;
        self.logout = logout;
        self.openSettings = openSettings;
        self.showChangePassword = showChangePassword;

        function logout() {
            loginService.logout();
        }

        function openSettings($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        }

        function showChangePassword(ev) {
            $mdDialog.show({
                controller: 'ChangePasswordController',
                controllerAs: 'cpc',
                templateUrl: './components/change-password/changePassword.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        }
    }
})();