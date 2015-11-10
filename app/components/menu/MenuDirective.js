angular
    .module('ebikko.menu')
    .controller('MenuController', ['$router', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', 'loginService',
        MenuController
    ])
    .directive('ebikkoMenu', function() {
        return {
            scope: {
                title: '@title'
            },
            bindToController: true,
            controller: 'MenuController',
            controllerAs: 'mc',
            templateUrl: '/components/menu/menu.html'
        };
    });