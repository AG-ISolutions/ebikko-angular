angular
    .module('ebikko.menu')
    .controller('MenuController', ['$router', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService', '$parse',
        MenuController
    ])

function MenuController($router, $mdSidenav, $mdBottomSheet, $mdDialog, $location, loginService, $parse) {
    this.title = "Ebikko";
    this.router = $router;
    var self = this;

    this.tabs = [];
    this.selectedMenuItem = {};

    this.menuItems = [{
        'name': 'All Meetings',
        'component': "nodes({type: 'saved-search', 'type-id': 'ia4065fe384245cc85e0670b7bb10c15'})",
        'id': 'all-meetings'
    }, {
        'name': 'Recent Records',
        'component': "nodes({type: 'recent-records', 'type-id': ''})",
        'id': 'recent-records'
    }];

    $router.config([{
        path: '/nodes/:type',
        component: 'nodes'
    }, {
        path: '/nodes/:type/:type-id',
        component: 'nodes'
    }]);

    this.selectMenuItem = function(menuItem) {
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

    this.selectTab = function(menuItem) {
        if (this.selectedMenuItem !== menuItem) {
            this.title = menuItem.name;
            this.selectedMenuItem = menuItem;
            var url = generateUrlForComponent(menuItem.component);
            $location.url(url);
        }
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

    var LINK_MICROSYNTAX_RE = /^(.+?)(?:\((.*)\))?$/;

    function generateUrlForComponent(component) {
        var parts = component.match(LINK_MICROSYNTAX_RE);
        var routeName = parts[1];
        var routeParams = parts[2];
        var routeParamsGetter = $parse(routeParams);
        var params = routeParamsGetter();
        return self.router.generate(routeName, params);
    }
};