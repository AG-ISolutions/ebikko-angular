(function() {
    "use strict";

    describe('Unit tests for Translation Loader', function() {

        var translationLoaderFactory, httpBackend;

        beforeEach(module('ebikko.conf'));

        beforeEach(inject(function($httpBackend, _translationLoaderFactory_) {
            translationLoaderFactory = _translationLoaderFactory_;
            httpBackend = $httpBackend;
        }));

        it("should convert the translation file into a key-value format", function() {
            httpBackend
                .whenGET(/\/js\/language(.*)/)
                .respond(200, exampleTranslationFile);

            var result;
            translationLoaderFactory({}).then(function(response) {
            	result = response;
            });

            httpBackend.flush();

            expect(result['Key ONE']).toEqual('Value ONE');
            expect(result['Key TWO']).toEqual('Value TWO');
        });

        var exampleTranslationFile = "Ext.namespace('Ext.Internationalization');Ext.Internationalization.language=[['Key ONE','Value ONE'],['Key TWO','Value TWO']];LoadAppLanguage();";

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
})();