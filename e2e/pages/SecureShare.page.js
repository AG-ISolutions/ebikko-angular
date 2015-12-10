'use strict';

var SecureSharePage = function() {

    this.searchForPrincipal = function(val) {
        element(by.css('form[name="secureShareForm"] md-autocomplete input')).sendKeys(val);
        return this;
    }

};

module.exports = SecureSharePage;