(function () {

  'use strict';

/**
 * @ngdoc overview
 * @name angularFinancialPortalApp
 * @description
 * # angularFinancialPortalApp
 *
 * Main module of the application.
 */
var app= angular
  .module('angularFinancialPortalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'highcharts-ng',
    'LocalStorageModule',
    'angularUtils.directives.dirPagination'
  ]);

  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .when('/assets', {
        templateUrl: 'views/assets.html',
        controller: 'AssetsCtrl',
        controllerAs: 'assets'
      })

      .when('/assets/:id', {
        templateUrl: 'views/assetfile.html',
        controller: 'AssetfileCtrl',
        controllerAs: 'assetfile'
      })
      
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })

      .otherwise({
        redirectTo: '/'
      });
  });

  app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('angularFinancialPortal');
  });

})();