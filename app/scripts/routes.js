define(['./app'], function (app) {
  'use strict';
   return app.config(['$routeProvider', function($routeProvider) {
     /*  $routeProvider.when('/multiline', {templateUrl: 'views/multiline.html',
        controller: 'MultilineCtrl'
        resolve: {
          cities : function(MultilineDataLoader) {
            return MultilineDataLoader();
          }
        }
      });   */
      $routeProvider.when('/bivariate', {templateUrl: 'views/bivariate.html',
        controller: 'BivariateCtrl'

      });
      $routeProvider.when('/bar', {templateUrl: 'views/bar.html',
        controller: 'BarCtrl'

      });

     $routeProvider.when('/force-collapse', {templateUrl: 'views/force-collapse.html',
       controller: 'ForceCollapseCtrl'

     });
     $routeProvider.when('/zoomable-icicle', {templateUrl: 'views/zoomable-icicle.html',
       controller: 'ZoomableIcicleCtrl'

     });
     $routeProvider.when('/stacked-grouped-bars', {templateUrl: 'views/stacked-grouped-bars.html',
       controller: 'ZoomableIcicleCtrl'

     });
     $routeProvider.when('/focus-context-area', {templateUrl: 'views/focus-context-area.html',
       controller: 'FocusContextAreaCtrl'

     });
     $routeProvider.when('/parallel-coordinates', {templateUrl: 'views/parallel-coordinates.html',
       controller: 'ParallelCoordinatesCtrl'

     });
     $routeProvider.when('/nfl-plot', {templateUrl: 'views/nfl-plot.html',
       controller: 'NflPlotCtrl'

     });
     $routeProvider.when('/auto-stream', {templateUrl: 'views/auto-stream.html',
       controller: 'AutoStreamCtrl'

     });
     $routeProvider.when('/realtime-linedata', {templateUrl: 'views/realtime-linedata.html',
       controller: 'RealtimeLinedataCtrl'

     });




 /*     $routeProvider.when('/area', {templateUrl: 'views/area.html',
        controller: 'AreaHistoPieCtrl'});
      $routeProvider.when('/date-histo', {templateUrl: 'views/date-histo.html',
        controller: 'AreaHistoPieCtrl'});
      $routeProvider.when('/pie-dohnut', {templateUrl: 'views/pie-dohnut.html',
        controller: 'AreaHistoPieCtrl'});     */
      $routeProvider.otherwise({redirectTo: '/home'});
    }]);
});
