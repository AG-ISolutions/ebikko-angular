(function() {
    'use strict';

    angular
        .module('ebikko', ['ngMaterial', 'ngNewRouter', 'ebikko.users', 'ebikko.login', 'ebikko.config', 'ebikko.menu', 'ebikko.nodes'])
        .controller('AppController', ['$router', AppController])
        .config(['$mdThemingProvider', '$mdIconProvider', '$httpProvider', function($mdThemingProvider, $mdIconProvider, $httpProvider) {

            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu", "./assets/svg/menu.svg", 24)
                .icon("settings", "./assets/svg/settings.svg", 24);

            $mdThemingProvider.theme('default')
                .primaryPalette('red')
                .accentPalette('orange');

            $httpProvider.defaults.withCredentials = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }]);

    function AppController($router) {
        $router.config([{
            path: '/',
            redirectTo: '/login'
        }, {
            path: '/login',
            component: 'login'
        }, {
            path: '/menu',
            component: 'menu'
        }]);
    }

})();