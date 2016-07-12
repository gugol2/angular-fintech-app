(function () {

  'use strict';
  /**
   * @ngdoc service
   * @name angularFinancialPortalApp.utilService
   * @description
   * # utilService
   * Factory in the angularFinancialPortalApp.
   */
  var app=angular.module('angularFinancialPortalApp');

  app.factory('utilService', [utilService]);


  function utilService() {
    // Service logic
    var serviceUtil={
      getRecursiveNameData:getRecursiveNameData,
      mapObjectToArray:mapObjectToArray
    };

    //Get the name data of a node recursively and return the destination array filled with the values found
    function getRecursiveNameData(recursiveData, pattern, destination) {

      var match;
      
      //if name add the name to the destination
      if(recursiveData && recursiveData.name){ 
        destination.push(recursiveData.name);

        //traverse the node Object
        for (var prop in recursiveData) {

          //check if any of the properties folllow the pattern
          if((match=pattern.test(prop))){
            //call again the function with the node of the property that followed the pattern
            return getRecursiveNameData(recursiveData[prop], pattern, destination);
          }
        }
      }else{
        //if the node does not follow the tree structure at any level
        console.log("ups, this is weird!!");
        return destination;
      }

      //if the nodes keep the tree structure to the very end, when it finishes all the recursive calls 
      console.log("all good!");
      return destination;

    };

    //Transorm an array of objects into an array of arrays
    function mapObjectToArray(bigArrayObjects) {
      var bigArrayArrays=[];
      var obj;
      for(var i=0; i<bigArrayObjects.length; i++){
        obj=bigArrayObjects[i];
        var arr = Object.keys(obj).map(function (key) {
          if(key==="date"){
            return Date.parse(obj[key]);
          }else{
            return obj[key]
          }          
        });
        //console.log(arr);
        bigArrayArrays.push(arr);
      }
      console.log(JSON.stringify(bigArrayArrays, null, 4));
      return bigArrayArrays;
      
    }

    // Public API exposed
    return serviceUtil;

    }

  })();