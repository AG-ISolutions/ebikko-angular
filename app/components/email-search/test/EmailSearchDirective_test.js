(function() {
    "use strict";

    describe("Unit tests for the email search directive", function() {
        var compile, scope, directiveElem, httpBackend, element;

        beforeEach(module('test-templates'));
        beforeEach(module('ebikko.email-search'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
            $provide.factory('translateFilter', function() {
                return {};
            });
        }));

        beforeEach(inject(function($compile, $rootScope, $httpBackend) {
            compile = $compile;
            scope = $rootScope.$new();
            scope.principals = [];
            httpBackend = $httpBackend;

            directiveElem = getCompiledElement();
        }));

        it('should have a chips element', function() {
            var chipsElement = directiveElem.find('md-chips');
            expect(chipsElement).toBeDefined();
        });

        function getCompiledElement() {
            element = angular.element('<ebikko-email-search model="principals"></ebikko-email-search>');
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }
    });
})();