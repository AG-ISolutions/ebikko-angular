(function() {
    "use strict";

    describe('Unit tests for Node Service', function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

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

        it("should perform text search", function() {
            httpBackend
                .when('GET', /NodeListing(.*)("method":"SEARCH")(.*)("search_method":"TEXT_SEARCH")(.*)("query":"searchString")(.*)/)
                .respond(200, getJSONFixture('nodes/quickSearch.json'));

            var searchResults;
            searchResults = nodeService.textSearch('searchString').then(function(response){
                searchResults = response;
            });

            httpBackend.flush();
            expect(searchResults.data.count).toEqual(3);
        });

        it("should perform a node document search", function() {
            httpBackend
                .when('GET', /EmailLink(.*)("email_link_id":"123")(.*)/)
                .respond(200, getJSONFixture('nodes/emailLinkSearch.json'));

            httpBackend
                .when('GET', /NodeListing(.*)("method":"SEARCH")(.*)("search_method":"NODE_UIDS")(.*)("node_ids":\["abc-111"\])(.*)/)
                .respond(200, getJSONFixture('nodes/uidSearch.json'));

            var searchResults;
            searchResults = nodeService.documentSearch("123").then(function(response){
                searchResults = response;
            });

            httpBackend.flush();
            expect(searchResults.data.count).toEqual(1);
        });

        it("should get recent records", function() {
            var start = 10;
            var limit = 5;

            httpBackend
                .when('GET', /NodeListing(.*)("method":"RECENTLY_UPDATED")(.*)(limit=5&start=10)(.*)/)
                .respond(200, getJSONFixture('nodes/recentRecords.json'));

            var recentRecords; 
            nodeService.getRecentRecords(start, limit).then(function(response) {
                recentRecords = response;
            });

            httpBackend.flush();
            expect(recentRecords.data.data.count).toEqual(3);
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();