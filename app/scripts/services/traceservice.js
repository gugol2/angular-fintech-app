(function () {
  
  'use strict';

  /**
   * @ngdoc service
   * @name angularFinancialPortalApp.traceService
   * @description
   * # traceService
   * Factory in the angularFinancialPortalApp.
   */
  var app=angular.module('angularFinancialPortalApp');

  app.factory('traceService', ['$log', traceService]);

    function traceService($log) {
      
      var serviceTrace = {
        catcher: catcher
      };

      function catcher(message) {
        return function(reason) {
          $log.info(message, reason);
        };
      }

      return serviceTrace;
  }

})();