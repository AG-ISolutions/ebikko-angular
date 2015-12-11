'use strict';

var ForgotPasswordPage = function() {

    var LoginPage = require('./Login.page.js');

    expect(browser.getCurrentUrl()).toMatch(/\/forgotPassword/);

    this.clickSubmit = function() {
        element(by.css('button.md-primary')).click();
        return this;
    }

    this.checkThePageHasErrors = function() {
        expect(by.css('div.error-message').text).not.toEqual('');
        return this;
    }

    this.goToLoginPage = function() {
        element(by.css('div.secondaryLink a.md-button')).click();
        return new LoginPage();
    }
};

module.exports = ForgotPasswordPage;