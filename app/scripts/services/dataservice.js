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
      getAssets:getAssets,
      getAssetFile: getAssetFile
    };

    function getAssets(){

      var promise=$http({
        url: apiConstants.API_URL,
        method: 'GET',
        dataType: 'json', 
        data: '',      
        headers: apiConstants.API_HEADERS
      })

      .then(function (response) {
          // The promise is resolved once the HTTP call is successful.
          if(response.status>=200 && response.status<400){
            return response.data;
          }else{
            return response.status;
          }  
      },
      function(reason) {
          // The promise is rejected if there is an error with the HTTP call.
          if(reason){
            return {msg:reason.statusText, status:reason.status};
            //if we don't get any answers the proxy/api will probably be down
          }else{
            //the error is a property of the reason object when it exists, so I mock the same structure when it does not.
            return {msg:'Call error', status:500};
          }

        });

        return promise;

    }


    function getAssetFile(id){

      var deferred = $q.defer();

      $http({
        url: apiConstants.API_URL + '/' + id,
        method: 'GET',
        dataType: 'json', 
        data: '',      
        headers: apiConstants.API_HEADERS
      })

      .success(function (data, status) {
          // The promise is resolved once the HTTP call is successful.
          if(status>=200 && status<400){
            deferred.resolve(data);
          }else{
            deferred.reject(status);
          }  
        })

      .error(function(reason, status) {
          // The promise is rejected if there is an error with the HTTP call.
          if(reason){
            deferred.reject({msg:reason.error, status:status});
            //if we don't get any answers the proxy/api will probably be down
          }else{
            //the error is a property of the reason object when it exists, so I mock the same structure when it does not.
            deferred.reject({msg:'Call error', status:status});
          }

        });

      // The promise is returned to the caller
      return deferred.promise;

    }

    // Public API here
    return serviceData;
  }

})();


