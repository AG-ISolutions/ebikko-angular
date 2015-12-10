'use strict';

var MenuPage = function() {

    var SecureSharePage = require('./SecureShare.page.js');

    expect(browser.getCurrentUrl()).toMatch(/\/menu/);

    this.openSideMenu = function() {
        element(by.css('button.menu')).click();
        return this;
    }

    this.clickOnRecentRecords = function() {
        element(by.id('mb_recent-records')).click();
        browser.driver.wait(function() {
            return browser.isElementPresent(by.css('table.treetable'));
        });
        return this;
    }

    this.openRecord = function(x) {
        element(by.css('table.treetable tbody tr:nth-child(' + x + ') td:nth-child(2)')).click();
        return this;
    }

    this.openTabMenu = function() {
        element(by.css('md-menu.tab-menu button')).click();
        return this;
    }

    this.openSecureShare = function() {
        element(by.css('button.secure-share')).click();
        return new SecureSharePage();
    }
};

module.exports = MenuPage;