(function () {
    "use strict";

    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("CheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['CheckOffService'];
    function ToBuyController(CheckOffService) {
        var toBuy = this;

        toBuy.items = CheckOffService.getToBuyItems();

        toBuy.buyItem = function (index) {
            CheckOffService.buyItem(index);
        }
    }

    AlreadyBoughtController.$inject = ['CheckOffService'];
    function AlreadyBoughtController(CheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = CheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this,
            toBuyItems = [{
                name: 'item1',
                quantity: 10
            }, {
                name: 'item2',
                quantity: 20
            }, {
                name: 'item3',
                quantity: 30
            }, {
                name: 'item4',
                quantity: 40
            }],
            alreadyBoughtItems = [];

        service.buyItem = function (index) {
            var item = toBuyItems[index];
            alreadyBoughtItems.push(item);
            toBuyItems.splice(index, 1);
            console.log(index);
            console.log(toBuyItems);
            console.log(alreadyBoughtItems);
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        }


    }
})();