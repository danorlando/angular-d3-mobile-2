define(['./module'],
    function (controllers) {
      controllers.controller('BivariateCtrl', ['$scope',
        function($scope) {
          $scope.title = "BivariateCtrl";
          //  $scope.data = new BivariateDataLoader();
        }]);
    });
