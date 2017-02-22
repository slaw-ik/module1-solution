(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
      .state('home', {
        url: '/',
        templateUrl: 'javascript/src/templates/home.template.html'
      })

      // Premade list page
      .state('categories', {
        url: '/categories',
        templateUrl: 'javascript/src/templates/categories-list.template.html',
        controller: 'CategoriesListController as catList',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/categories/{catName}/items',
        templateUrl: 'javascript/src/templates/item-list.template.html',
        controller: 'ItemListController as itemList',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.catName)
          }]
        }
      });
  }

})();