
define(['./module'],
    function (controllers) {
      controllers.controller('RootCtrl', ['$scope', 'JSONChartDataService',
      function($scope, JSONChartDataService) {
        $scope.name = JSONChartDataService.getChartData();
      }]);
controllers.controller('BarCtrl', ['$scope',
    function($scope) {
        $scope.title = "BarCtrl";
      //  $scope.data = new BarDataLoader();
    }]);


controllers.controller('AreaHistoPieCtrl', function($scope) {
        var resultsA = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
      					term : "Prod-C",
      					count : 62
      				}]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				},{
        				term : "Female",
        				count : 148
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}, {
	        			time : 1349049600000,
	        			count : 45
	      			}, {
	        			time : 1351728000000,
	        			count : 134
	      			}]
        		}
        	}
        };

        var resultsB = {
        	facets: {
    			Product : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Prod-A",
        				count : 306
      				},{
        				term : "Prod-B",
        				count : 148
      				},{
                        term : "Prod-C",
                        count : 0
                    }]
    			},
    			Sex : {
      				_type : "terms",
      				missing : 0,
      				total : 454,
      				other : 0,
      				terms : [{
        				term : "Male",
        				count : 36
      				}]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [{
	        			time : 1341100800000,
	        			count : 9
	      			}, {
	        			time : 1343779200000,
	        			count : 32
	      			}, {
	        			time : 1346457600000,
	        			count : 78
	      			}]
        		}
        	}
        };

        $scope.filterSearchA = function(type, term) {
            switch(currentResults) {
                case 'A':
                    $scope.results = resultsB;
                    currentResults = 'B';
                    break;
                case 'B':
                    $scope.results = resultsA;
                    currentResults = 'A';
                    break;
            }
        };

        $scope.results = resultsA;
        var currentResults = 'A';

    });

 controllers.controller('ScatterCtrl', ['$scope', function ScatterPlotCtrl ($scope) {
            $scope.options = {width: 500, height: 500, 'bar': 'aaa'};
            $scope.data = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];
            $scope.hovered = function(d){
                $scope.plotValue = d;
                $scope.$apply();
            };
            $scope.plotValue = 'None';

  }]);


});
