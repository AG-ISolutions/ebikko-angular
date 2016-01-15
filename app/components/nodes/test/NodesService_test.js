(function() {
    "use strict";

    describe('Unit tests for Node Service', function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        var httpBackend, nodesService;

        beforeEach(module('ebikko.nodes'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function(num) {
                    return '123';
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _nodesService_) {
            nodesService = _nodesService_;
            httpBackend = $httpBackend;
        }));

        it("should perform text search", function() {
            httpBackend
                .when('GET', /NodeListing(.*)("method":"SEARCH")(.*)("search_method":"TEXT_SEARCH")(.*)("query":"searchString")(.*)/)
                .respond(200, getJSONFixture('nodes/quickSearch.json'));

            var searchResults;
            searchResults = nodesService.textSearch('searchString').then(function(response){
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
            searchResults = nodesService.documentSearch("123").then(function(response){
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
            nodesService.getRecentRecords(start, limit).then(function(response) {
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