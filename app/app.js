angular
    .module('ebikko', ['ngMaterial', 'ngNewRouter', 'ebikko.users', 'ebikko.login', 'ebikko.detail', 'ebikko.config', 'ebikko.menu', 'ebikko.nodes'])
    .controller('AppController', ['$router', AppController])
    .config(['$mdThemingProvider', '$mdIconProvider', '$httpProvider', function($mdThemingProvider, $mdIconProvider, $httpProvider) {

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('brown')
            .accentPalette('red');

        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

function AppController($router) {   
    $router.config([
        { path: '/', redirectTo: '/login' },
        { path: '/login', component: 'login'},
        { path: '/nodes/:type', component: 'nodes'},
        { path: '/nodes/:type/:type-id', component: 'nodes'}
    ]);

}