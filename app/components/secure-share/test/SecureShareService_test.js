(function() {
    "use strict";

    describe('Unit tests for Secure Share Service', function() {
        var httpBackend, secureShareService;

        beforeEach(module('ebikko.secure-share'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
                this.getPrincipalDetails = function() {
                    return {
                        results: [{
                            principal_id: 111
                        }]
                    };
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _secureShareService_) {
            secureShareService = _secureShareService_;
            httpBackend = $httpBackend;
        }));

        it('should send post to secure share', function() {
            var opts = {
                nodeId: 'abc-def',
                principals: []
            };
            httpBackend
                .expectPOST(/\/Pin(.*)("ebikko_session_id":"123")(.*)("method":"PIN_SEND")(.*)("node_ids":\["abc-def"\])(.*)("principal_id":111)(.*)/)
                .respond(200);

            secureShareService.secureShareNode(opts);

            httpBackend.flush();
        });

        it('should send undefined use_only_once as false', function() {
            var opts = {
                nodeId: 'abc-def',
                principals: []
            };

            httpBackend
                .expectPOST(/\/Pin(.*)("use_once_only":false)(.*)/)
                .respond(200);

            secureShareService.secureShareNode(opts);

            httpBackend.flush();
        });

        it('should send emails semi-colon delimited', function() {
            var opts = {
                nodeId: 'abc',
                principals: [{
                    'email': 'test1'
                }, {
                    'email': 'test2'
                }]
            };

            httpBackend
                .expectPOST(/\/Pin(.*)("emails":"test1;test2")(.*)/)
                .respond(200);

            secureShareService.secureShareNode(opts);

            httpBackend.flush();
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();