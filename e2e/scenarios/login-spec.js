(function() {

    "use strict";

    describe('login page tests', function() {

        var LoginPage = require('../pages/Login.page.js');
        var page;

        beforeEach(function() {
            browser.get('');
            page = new LoginPage();
        });

        it('should perform validation on login page and forgot password page', function() {
            page
                .goToForgotPassword()
                .clickSubmit()
                .checkThePageHasErrors()
                .goToLoginPage()
                .clickSubmitExpectingToFail()
                .checkThePageHasErrors();
        });

        it('should login', function() {
            page
                .enterUsernameAndPassword('root@tricor', 'root')
                .clickSubmitExpectingToPass();
        })
    });

})();