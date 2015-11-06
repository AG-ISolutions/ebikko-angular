angular
    .module('ebikko.menu')
    .controller('MenuController', ['$router', '$mdSidenav', '$mdBottomSheet',
    	MenuController
	]);

function MenuController($router, $mdSidenav, $mdBottomSheet) {
    this.menuItems = [
    	{'name': 'All meetings', 'href': '/#/nodes/saved-search/ia4065fe384245cc85e0670b7bb10c15'},
    	{'name': 'Recent Records', 'href': '/#/nodes/recent-records'}
    ];

    this.toggleSidebar = function() {
        var pending = $mdBottomSheet.hide() || $q.when(true);

        pending.then(function() {
            $mdSidenav('left').toggle();
        });
    }
};