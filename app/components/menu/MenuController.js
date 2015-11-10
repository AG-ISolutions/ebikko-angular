angular
    .module('ebikko.menu')
    .controller('MenuController', ['$router', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService', 'menuService',
        MenuController
    ]);

function MenuController($router, $mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService, menuService) {
    this.title = "Test title";
    this.router = $router;

    this.menuItems = [{
        'name': 'All meetings',
        'href': '/nodes/saved-search/ia4065fe384245cc85e0670b7bb10c15',
        'id': 'all-meetings'
    }, {
        'name': 'Recent Records',
        'href': '/nodes/recent-records',
        'id': 'recent-records'
    }];

    this.selectMenuItem = function(menuItem) {
        this.title = menuItem.name; 
        $router.navigate(menuItem.href);
    }

    this.toggleSidebar = function() {
        var pending = $mdBottomSheet.hide() || $q.when(true);

        pending.then(function() {
            $mdSidenav('left').toggle();
        });
    }

    this.logout = function() {
        loginService.logout()
            .then(function(data) {
                $location.url("/");
            });
    }

    var originatorEv;
    this.openSettings = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    }

    this.showChangePassword = function(ev) {
        $mdDialog.show({
            controller: ChangePasswordController,
            controllerAs: 'cpc',
            templateUrl: '/components/menu/changePassword.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function(answer) {
            alert('ok');
        });
    }
};