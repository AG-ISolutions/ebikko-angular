(function() {
    "use strict";

    describe("Unit tests for the email search service", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/'; 

        beforeEach(module('ebikko.email-search'));

        var httpBackend, emailSearchService;

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _emailSearchService_) {
            emailSearchService = _emailSearchService_;
            httpBackend = $httpBackend;
        }));

        it("should perform a principal search", function() {
            httpBackend
                .expectPOST(/\/Principal(.*)("method":"FILTER")(.*)("val":"\*John\*")(.*)/)
                .respond(200);

            emailSearchService.search('John');

            httpBackend.flush();
        });
    });
})();