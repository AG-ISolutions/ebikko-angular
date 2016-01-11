(function() {
    "use strict";

    describe("Unit tests for the NodeContentController", function() {
        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-content'));

        var nodeContentController, httpBackend;

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function(num) {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            nodeContentController = _$controller_('NodeContentController');
            httpBackend = _$httpBackend_;
        }));

        it("should load content url from service and remove host", function() {
            httpBackend
                .expectGET(/\/Content/)
                .respond(200, getJSONFixture('nodes/content.json'));

            httpBackend.flush();

            expect(nodeContentController.contentUrl).toEqual('/downloadURL/123456/V1-pdf-sample.pdf');
        });

    });
})();