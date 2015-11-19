(function() {
    "use strict"

    describe('Unit tests for Message Resolver service', function() {
        var messageResolver;

        beforeEach(module('ebikko.config'));

        beforeEach(inject(function(_messageResolver_) {
            messageResolver = _messageResolver_;
        }));

        it('should resolve simple message', function() {
        	var resolvedMessage = messageResolver.resolveMessage("EBW-0-16");

        	expect(resolvedMessage).toEqual("Invalid Username or Password");
        });

        it('should resolve messages with parameters', function() {
        	var resolvedMessage = messageResolver.resolveMessage("EBW-22-11", ["8"]);

        	expect(resolvedMessage).toEqual("Password must contain at least 8 characters long.")
        });
    });
})();