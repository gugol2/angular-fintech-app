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

      // We make use of Angular's $q library to create the deferred instance
      var deferred = $q.defer();

      $http({
        url: apiConstants.API_URL,
        method: 'GET',
        dataType: 'json', 
        data: '',      
        headers: apiConstants.API_HEADERS
      })

      .then(function (response) {
          // The promise is resolved once the HTTP call is successful.
          deferred.resolve(response.data);
        },
        function(reason) {
          // The promise is rejected if there is an error with the HTTP call.
          if(reason.statusText){
            deferred.reject(reason);
          }else{
            //If we don't get any answers the proxy/api will probably be down.
            //The error is a property of the reason object when it exists, so I mock the same structure when it does not.
            deferred.reject({statusText:'Call error', status:500});
          }
        }
      );

      return deferred.promise;
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
          }else{
            //If we don't get any answers the proxy/api will probably be down.
            //The error is a property of the reason object when it exists, so I mock the same structure when it does not.
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


