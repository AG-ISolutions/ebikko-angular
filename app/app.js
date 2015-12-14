(function() {
    'use strict';

    angular
        .module('ebikko', ['ngMaterial', 'ngNewRouter', 'ebikko.login', 'ebikko.config', 'ebikko.menu', 'ebikko.nodes', 'ebikko.forgot-password', 'ebikko.node-properties', 'ebikko.tabs', 'ebikko.email-search'])
        .controller('AppController', ['$router', '$rootScope', '$mdToast', 'tabService', 'userRepository', AppController])
        .config(['$mdThemingProvider', '$mdIconProvider', '$httpProvider', '$mdDateLocaleProvider',
            function($mdThemingProvider, $mdIconProvider, $httpProvider, $mdDateLocaleProvider) {

                $mdIconProvider
                    .defaultIconSet("./assets/svg/avatars.svg", 128)
                    .icon("close", "./assets/svg/ic_clear_black_24px.svg", 24)
                    .icon("download", "./assets/svg/ic_file_download_black_24px.svg", 24)
                    .icon("email", "./assets/svg/ic_email_black_24px.svg", 24)
                    .icon("fullscreen", "./assets/svg/ic_fullscreen_white_24px.svg", 24)
                    .icon("info", "./assets/svg/ic_info_outline_black_24px.svg", 24)
                    .icon("menu", "./assets/svg/menu.svg", 24)
                    .icon("menu_secondary", "./assets/svg/ic_more_vert_black_24px.svg", 24)
                    .icon("search", "./assets/svg/ic_search_black_24px.svg", 24)
                    .icon("settings", "./assets/svg/settings.svg", 24)
                    .icon("share", "./assets/svg/ic_reply_black_24px.svg", 24);

                $mdThemingProvider.theme('default')
                    .primaryPalette('red')
                    .accentPalette('orange');

                $mdDateLocaleProvider.formatDate = function(date) {
                    if (date) {
                        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    } else {
                        return "";
                    }
                };

                $httpProvider.defaults.withCredentials = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
            }
        ]);

    function AppController($router, $rootScope, $mdToast, tabService, userRepository) {
        $router.config([{
            path: '/',
            redirectTo: '/login'
        }, {
            path: '/login',
            component: 'login'
        }, {
            path: '/menu',
            component: 'menu'
        }, {
            path: '/forgotPassword',
            component: 'forgotPassword'
        }]);

        $rootScope.$on('loginSuccess', function() {
            tabService.clearTabs();
            $router.navigate('menu');
        });

        $rootScope.$on('logoutSuccess', function() {
            tabService.clearTabs();
            userRepository.clearCurrentUser();
            $router.navigate('login');
        });

        $rootScope.$on('passwordResetSuccess', function() {
            $router.navigate('login');
            $mdToast.show(
                $mdToast.simple()
                .content('Password recovery in progress, please check email')
                .position('top left')
                .hideDelay(3000)
            );
        });
    }

})();