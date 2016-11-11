(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.msg = "";
        $scope.textClass = "";
        $scope.borderClass = "";
        $scope.showMessage = false;

        $scope.check = function () {
            var removeEmptyStrings = function (n) {
                    return n && n.replace(/\s/g, "").length > 0
                },
                calculterMessage = function (count) {
                    if (count > 3) {
                        return "Too much!";
                    } else {
                        return "Enjoy!";
                    }
                }

            if ($scope.menu) {
                var foodsAray = $scope.menu.split(','),
                    allCount = foodsAray.length,
                    nonEmptyCount = foodsAray.filter(removeEmptyStrings).length;

                $scope.msg = calculterMessage(nonEmptyCount);

                if (allCount != nonEmptyCount) {
                    $scope.showMessage = true;
                    $scope.borderClass = "red";
                } else {
                    $scope.borderClass = "green";
                    $scope.showMessage = false;
                }
                $scope.textClass = "green";

            } else {
                $scope.msg = "Please enter data first";
                $scope.textClass = "red";
                $scope.borderClass = "red";
            }
        }
    }
})();