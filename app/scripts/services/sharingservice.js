(function () {

  'use strict';

  /**
   * @ngdoc service
   * @name angularFinancialPortalApp.sharingService
   * @description
   * # sharingService
   * Factory in the angularFinancialPortalApp.
   */
  var app=angular.module('angularFinancialPortalApp');

  app.factory('sharingService', [sharingService]);


  function sharingService() {
    // Service logic
    var serviceSharing={
      getAssets:getAssets,
      setAssets:setAssets
    };

    var assets=[];

    function getAssets(){
      return assets;
    }


    function setAssets(arr){
      assets = arr;
    }

    // Public API exposed
    return serviceSharing;
  }

 })();