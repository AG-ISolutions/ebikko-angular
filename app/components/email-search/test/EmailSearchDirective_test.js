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

        it('should search for principals when text is entered', function() {
            httpBackend
                .expectPOST(/\/Principal(.*)/)
                .respond(200, getJSONFixture('principalSearch.json'));

            var inputElem = angular.element(directiveElem.find('input'));
            inputElem.val('Some text').trigger('input');
            scope.$apply();
            
            httpBackend.flush();
        });

        function getCompiledElement() {
            element = angular.element('<ebikko-email-search model="principals"></ebikko-email-search>');
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }
    });
})();