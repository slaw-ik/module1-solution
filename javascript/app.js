(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'found_items.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundCtrl',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var foundCtrl = this;

        foundCtrl.noItems = function () {
            return foundCtrl.foundItems.length == 0;
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        ctrl.found = [];

        ctrl.getMatchedMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function (found) {
                ctrl.found = found;
            })
        };

        ctrl.removeItem = function (index) {
            console.log('Remove Item' + index);
            ctrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                url: (ApiBasePath + '/menu_items.json')
            })
                .then(function (result) {

                    var menuItems = result.data.menu_items,
                        foundItems;

                    foundItems = menuItems.filter(function (elem) {
                        return searchTerm && (searchTerm.trim() != "") && (elem.name.toLowerCase().indexOf(searchTerm) > -1)
                    });

                    return foundItems;
                });
        }
    }

})();