angular.module('ebikko.detail', ['ngNewRouter'])
  .controller('DetailController', ['$routeParams', DetailController]);

function DetailController ($routeParams) {
  this.id = $routeParams.id;
}
