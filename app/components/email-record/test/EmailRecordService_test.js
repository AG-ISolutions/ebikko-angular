(function() {
    "use strict";

    describe('Unit tests for Email Record Service', function() {
        var httpBackend, emailRecordService;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures/';

        beforeEach(module('ebikko.email-record'));

        beforeEach(module(function($provide) {
            $provide.service('userRepository', function() {
                this.getSessionId = function() {
                    return '123';
                };
                this.getPrincipalDetails = function() {
                    return getJSONFixture('principalDetails.json');
                };
            });
        }));

        beforeEach(inject(function($httpBackend, _emailRecordService_) {
            emailRecordService = _emailRecordService_;
            httpBackend = $httpBackend;
        }));

        it('should send post to email record', function() {
            var email = {
                principals: []
            };
            httpBackend
                .expectPOST(/\/SendEmail(.*)("ebikko_session_id":"123")(.*)("method":"EMAIL_LINK")(.*)("sender":"testemail@email.com")(.*)/)
                .respond(200);

            emailRecordService.emailRecord(email);

            httpBackend.flush();
        });

        it('should send as EMAIL_CONTENT when email as content is true', function() {
            var email = {
                'email_as_content': true,
                principals: []
            };

            httpBackend
                .expectPOST(/\/SendEmail(.*)("method":"EMAIL_CONTENT")(.*)/)
                .respond(200);

            emailRecordService.emailRecord(email);

            httpBackend.flush();
        });

        it('should transform the principals into a list of email addresses', function() {
            var email = {
                'principals': [{
                    'email': 'email1'
                }, {
                    'email': 'email2'
                }]
            };

            httpBackend
                .expectPOST(/\/SendEmail(.*)("receiver_list":\["email1","email2"\])(.*)/)
                .respond(200);

            emailRecordService.emailRecord(email);

            httpBackend.flush();
        });

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();