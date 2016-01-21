(function() {
    "use strict";

    describe("Unit tests for the NodeCreateController", function() {

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.node-create'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
            });
        }));

        var nodeCreateController, httpBackend, nodeCreateService;

        beforeEach(inject(function(_$controller_, _$httpBackend_, _nodeCreateService_) {
            httpBackend = _$httpBackend_;
            nodeCreateService = _nodeCreateService_;

            httpBackend
                .expectGET(/\/NodeType(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypeDetails.json'));

            nodeCreateController = _$controller_('NodeCreateController');
            nodeCreateController.node = {
                "title": "Sample title",
                "data": {}
            };
        }));

        it("should do load and process the node type details", function() {
            httpBackend
                .expectGET(/\/NodeType(.*)/)
                .respond(200, getJSONFixture('nodes/nodeTypeDetails.json'));

            nodeCreateController.activate();

            httpBackend.flush();

            expect(nodeCreateController.nodeTypeProperties.length).toEqual(6);
        });

        it("should convert principals to list of IDs", function() {
            spyOn(nodeCreateService, 'saveNode').and.callThrough();
            nodeCreateController.principalSearches.abc = [{
                "_id": "123",
                "principal_id": "123",
                "name": "Joe"
            }];

            nodeCreateController.save();

            expect(nodeCreateService.saveNode).toHaveBeenCalledWith(jasmine.objectContaining({
                "data": {
                    "abc": ["123"]
                }
            }));
        });

        it("should convert since principal to ID", function() {
            spyOn(nodeCreateService, 'saveNode').and.callThrough();
            nodeCreateController.principalSearches.abc = {
                "_id": "123",
                "principal_id": "123",
                "name": "Joe"
            };

            nodeCreateController.save();

            expect(nodeCreateService.saveNode).toHaveBeenCalledWith(jasmine.objectContaining({
                "data": {
                    "abc": "123"
                }
            }));
        });

        it("should format the dates to YYYY-MM-DD", function() {
            spyOn(nodeCreateService, 'saveNode').and.callThrough();
            var date = new Date(2012, 0, 17);

            nodeCreateController.node = {
                title: "Title",
                data: {
                    "abc": date
                }
            };

            nodeCreateController.save();

            expect(nodeCreateService.saveNode).toHaveBeenCalledWith(jasmine.objectContaining({
                "data": {
                    "abc": "2012-1-17"
                }
            }));
        });

        it("should include non readonly properties", function() {
            var prop = {
                properties: {
                    is_readonly: false
                }
            };

            var output = nodeCreateController.ignoreReadOnlyProperties(prop);

            expect(output).toBeTruthy();
        });

        it("should ignore readonly properties", function() {
            var prop = {
                properties: {
                    is_readonly: true
                }
            };

            var output = nodeCreateController.ignoreReadOnlyProperties(prop);

            expect(output).toBeFalsy();
        });

        it("should include non-custom properties", function() {
            var prop = {};

            var output = nodeCreateController.ignoreReadOnlyProperties(prop);

            expect(output).toBeTruthy();
        });

        it("should load lookups", function() {
            httpBackend
                .expectGET(/\/LookupSet(.*)("lookup_id":"123")(.*)/)
                .respond(200, getJSONFixture('nodes/lookupSet.json'));

            nodeCreateController.loadLookup('123');

            httpBackend.flush();

            expect(nodeCreateController.lookups['123'].length).toEqual(5);
        });

        it("should not save invalid nodes", function() {
            spyOn(nodeCreateService, 'saveNode').and.callThrough();
            nodeCreateController.node.title = null;

            nodeCreateController.save();

            expect(nodeCreateService.saveNode.calls.any()).toBeFalsy();
        });
    });
})();