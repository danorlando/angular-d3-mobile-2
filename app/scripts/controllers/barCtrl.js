define(['./module'],
    function (controllers) {
		controllers.controller('BarCtrl', ['$scope',
		    function($scope) {
		        $scope.title = "BarCtrl";
		      //  $scope.data = new BarDataLoader();
          $scope.data = [
            {name: "Greg", score: 98},
            {name: "Ari", score: 96},
            {name: 'Q', score: 75},
            {name: "Loser", score: 48}
          ];
		    }]);

 });
