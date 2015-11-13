(function() {
    'use strict';

    angular
        .module('ebikko.menu')
        .directive('contentContainer', ['$compile', function($compile) {

            function link(scope, element, attrs) {
                var el = $compile(scope.content)(scope);
                element.append(el);
            }

            return {
                scope: {
                    content: '='
                },
                restrict: 'E',
                link: link
            };
        }])
})();