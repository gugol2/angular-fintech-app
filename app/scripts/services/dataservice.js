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
      getAssets:getAssets
    };

    function getAssets(){

      var deferred = $q.defer();

      $http({
        url: apiConstants.API_URL,
        method: 'GET',
        dataType: 'json', 
        data: '',      
        headers: apiConstants.API_HEADERS
      })

        .success(function (data, status, headers, config) {
          // The promise is resolved once the HTTP call is successful.
          if(status>=200 && status<400){
            //console.log(JSON.stringify(data, null, 4));
            deferred.resolve(data);
          }else{
            deferred.reject(status);
          }  
          //console.log("done!!!");
          /*console.log(status);
          console.log(headers); //function
          console.log(config);  //Object*/
        })

        .error(function(reason) {
          // The promise is rejected if there is an error with the HTTP call.
          if(reason){
            deferred.reject(reason);
            //if we don't get any answers the proxy/api will probably be down
          }else{
            deferred.reject({responseData: 'Gateway Timeout: The proxy/api is probably down', responseStatus: 504});
          }

          console.log("failed!!"+reason);
        });

        // The promise is returned to the caller
        return deferred.promise;

      }


    // Public API here
    return serviceData;
  }

})();


