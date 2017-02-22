(function () {
  "use strict";

  angular.module('MenuApp')
    .controller('CategoriesListController', CategoriesListController);

  CategoriesListController.$inject = ['categories'];
  function CategoriesListController(cats) {
    var catList = this;
    catList.categories = cats.data;
  }
})();