(function() {
    'use strict';

    angular
        .module('ebikko.tabs')
        .directive('contentContainer', ['$compile', ContentContainer]);

    function ContentContainer($compile) {

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
    }
})();