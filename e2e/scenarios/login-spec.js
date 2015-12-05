(function() {

    "use strict";

    describe('login page tests', function() {

        beforeEach(function() {
            browser.get('/');
        })

        it('should navigate to forgot password and back again', function() {
            element(by.css('div.secondaryLink a.md-button')).click();

            expect(browser.getCurrentUrl()).toMatch(/\/forgotPassword/);

            element(by.css('div.secondaryLink a.md-button')).click();

            expect(browser.getCurrentUrl()).toMatch(/\/login/);
        });

        it('should reset the password', function() {
            element(by.css('div.secondaryLink a.md-button')).click();

            element(by.css('button.md-primary')).click();

            expect(by.css('div.error-message').text).not.toEqual('');

            element(by.model('forgotPassword.username')).sendKeys('sarah@tricor');
            element(by.model('forgotPassword.email')).sendKeys('graham.seabrook@ag-isolutions.com');

            element(by.css('button.md-primary')).click();

            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return /\/login/.test(url);
                });
            }, 3000);

        });
    });

})();