'use strict';

/**
 * @ngdoc service
 * @name angularFinancialPortalApp.traceService
 * @description
 * # traceService
 * Factory in the angularFinancialPortalApp.
 */
angular.module('angularFinancialPortalApp')
  .factory('traceService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
