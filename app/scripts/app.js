define([
  'angular',
  'angular-route',
  'angular-resource',
  './controllers/index',
  './directives/index',
  './filters/index',
  './services/index'
],
    function(angular) {
'use strict';

return angular.module('app', [
  'app.controllers',
  'app.directives',
  'app.filters',
  'app.services',
  'ngRoute',
  'ngResource'
  ]);


});
