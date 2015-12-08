'use strict';

var MenuPage = function() {

    expect(browser.getCurrentUrl()).toMatch(/\/menu/);

    this.openSideMenu = function() {
        element(by.css('button.menu')).click();
        return this;
    }

    this.clickOnRecentRecords = function() {
        element(by.id('mb_recent-records')).click();
        return this;
    }
};

module.exports = MenuPage;