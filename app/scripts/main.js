require.config({
	paths: {
		'angular': '../bower_components/angular/angular',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angular-route': '../bower_components/angular-route/angular-route',
		'jquery': '../bower_components/jquery/jquery',
		'domReady': '../bower_components/requirejs-domready/domReady',
    'd3': '../bower_components/d3/d3',
    'dangle': '../vendor/dangle',
    'jquery.bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'ng-grid': '../vendor/ng-grid',
    'underscore': '../bower_components/underscore/underscore-min'
	},
	shim: {
    'angular': {
      deps:['jquery', 'jquery.bootstrap'],
      exports: 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'angular-resource': {
      deps: ['angular']
    },
    'ng-grid': {
      deps: ['angular', 'jquery']
    },
    'dangle': {
      deps: ['d3']
    },
    'jquery.bootstrap' : {
      deps: ['jquery']
    },
    'angular-mocks': {
      deps:['angular'],
      'exports':'angular.mock'
    }
	},
  deps: ['./bootstrap']
 /* priority: [
    "angular"
  ]  */
});
