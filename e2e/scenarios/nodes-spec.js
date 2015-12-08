(function() {

    "use strict";

    describe('nodes page tests', function() {

        var LoginPage = require('../pages/Login.page.js');
        var page;

        beforeEach(function() {
            browser.get('');
            page = new LoginPage()
                .enterUsernameAndPassword('root@tricor', 'root')
                .clickSubmitExpectingToPass();
        });

        it('should open the side bar and view the recent records', function() {
            page
                .openSideMenu()
                .clickOnRecentRecords();
        });

    });

})();