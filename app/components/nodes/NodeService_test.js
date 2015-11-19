(function() {
    "use strict";

    describe('Unit tests for Node Service', function() {

        var httpBackend, nodeService;

        beforeEach(module('ebikko.nodes'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function(num) {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _nodeService_) {
            nodeService = _nodeService_;
            httpBackend = $httpBackend;
        }));

        it('should request content url', function() {
            httpBackend
                .when('GET', /(.*)\/Content\?json=(.*)/)
                .respond(200, {
                    "success": true,
                    "code": 100,
                    "data": {
                        "url": "/testUrl",
                        "contentUrl": "/testUrl"
                    }
                });

            var url;
            nodeService.getDownloadUrl('123').then(function(response) {
            	url = response;
            });

            httpBackend.flush();

            expect(url).toEqual('/testUrl');
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();