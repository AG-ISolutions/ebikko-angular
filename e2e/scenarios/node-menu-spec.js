(function() {

    "use strict";

    describe('nodes page tests', function() {

        var LoginPage = require('../pages/Login.page.js');
        var page;

        beforeEach(function() {
            browser.get('');
            page = new LoginPage()
                .enterUsernameAndPassword('root@demo208', 'root')
                .clickSubmitExpectingToPass();
        });

        it('should open the side bar and view the first recent record', function() {
            page
                .openSideMenu()
                .clickOnRecentRecords()
                .openRecord(1)
                .openTabMenu()
                .openSecureShare()
                .searchForPrincipal('gra');
        });
    });
})();