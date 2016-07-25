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
            //The statusText is a property of the reason object when it exists, so I mock the same structure when it does not.
            deferred.reject({statusText:'Call error', status:500});
          }
        }
      );

      // The promise is returned to the caller
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

      .then(function (response) {
          // The promise is resolved once the HTTP call is successful.
          deferred.resolve(response.data);
      },

      function(reason) {
          // The promise is rejected if there is an error with the HTTP call.
          if(reason){
            deferred.reject(reason);
          }else{
            //If we don't get any answers the proxy/api will probably be down.
            //The statusText is a property of the reason object when it exists, so I mock the same structure when it does not.
            deferred.reject({statusText:'Call error', status:500});
          }

        });

      // The promise is returned to the caller
      return deferred.promise;

    }

    // Public API here
    return serviceData;
  }

})();


