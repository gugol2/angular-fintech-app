(function () {
  'use strict';


/**
 * @ngdoc service
 * @name angularFinancialPortalApp.dataService
 * @description
 * # dataService
 * Factory in the angularFinancialPortalApp.
 */
 var app= angular.module('angularFinancialPortalApp');

 app.factory('dataService', ['$http', '$q', 'apiConstants', dataService]);

 function dataService($http, $q, apiConstants) {
    // Service logic
    
    var serviceData={
      getAll:getAll
    };

    function getAll(){

      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: apiConstants.API_URL,
        headers: apiConstants.API_HEADERS
      })

      .success(function(response) {
          // The promise is resolved once the HTTP call is successful.
          /*if(response.responseStatus>=200 && response.responseStatus<400){
            deferred.resolve(response.responseData[0]);
          }else{
            deferred.reject({responseData: response.responseData, responseStatus: response.responseStatus});
          }  */
          console.log("done!!!");
        })

      .error(function(reason) {
          /*// The promise is rejected if there is an error with the HTTP call.
          if(reason){
            deferred.reject(reason);
            //if we don't get any answers the proxy/api will probably be down
          }else{
            deferred.reject({responseData: 'Gateway Timeout: The proxy/api is probably down', responseStatus: 504});
          }*/

          console.log("failed!!");
        });

        // The promise is returned to the caller
        return deferred.promise;

      }

    // Public API here
    return serviceData;
  }

})();


