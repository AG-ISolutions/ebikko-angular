'use strict';

var LoginPage = function() {

    var ForgotPasswordPage = require('./ForgotPassword.page.js');
    var MenuPage = require('./Menu.page.js');

    expect(browser.getCurrentUrl()).toMatch(/\/login/);

    this.goToForgotPassword = function() {
        element(by.css('div.secondaryLink a.md-button')).click();
        return new ForgotPasswordPage();
    }

    this.clickSubmitExpectingToFail = function() {
        element(by.css('button.md-primary')).click();
        return this;
    }

    this.checkThePageHasErrors = function() {
        expect(by.css('div.error-message').text).not.toEqual('');
        return this;
    }

    this.enterUsernameAndPassword = function(username, password) {
        element(by.model('login.username')).sendKeys(username);
        element(by.model('login.password')).sendKeys(password);
        return this;
    }

    this.clickSubmitExpectingToPass = function() {
        element(by.css('button.md-primary')).click();
        return new MenuPage();
    }
};

module.exports = LoginPage;