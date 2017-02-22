(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'javascript/src/templates/categories.template.html',
      bindings: {
        categories: '<'
      }
    });

})();