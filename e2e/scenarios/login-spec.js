describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('/app');

    element(by.model('login.username')).sendKeys('username');
    element(by.model('login.password')).sendKeys('password');

    element(by.css('button')).click();

    element(by.css('md-icon[md-svg-icon="settings"]')).click();

  });
});
