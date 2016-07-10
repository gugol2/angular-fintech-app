(function () {

	'use strict';

	/**
	 * @ngdoc function
	 * @name angularFinancialPortalApp.controller:AssetfileCtrl
	 * @description
	 * # AssetfileCtrl
	 * Controller of the angularFinancialPortalApp
	 */
	var app= angular.module('angularFinancialPortalApp');

	app.controller('AssetfileCtrl', ['$scope', 'dataService', '$window', '$routeParams', 'apiConstants', 'traceService', AssetfileCtrl]);

	function AssetfileCtrl($scope, dataService, $window, $routeParams, apiConstants, traceService) {

		$scope.regions=[];
		$scope.risk_families=[];
		$scope.sectors=[];

		//Get the name data of a node recursively
		$scope.getRecursiveNameData=function(recursiveData, pattern, destination) {

			var match;
			
			//if name add the name to the destination
			if(recursiveData && recursiveData.name){ 
				destination.push(recursiveData.name);

				//traverse the node Object
				for (var prop in recursiveData) {

					//check if any of the properties folllow the pattern
					if((match=pattern.test(prop))){
						//call again the function with the node of the property that followed the pattern
						return $scope.getRecursiveNameData(recursiveData[prop], pattern, destination);
					}
				}
			}else{
				//if the node does not follow the tree structure at any level
				console.log("ups, this is weird!!");
				return destination;
			}

			//if the nodes keep the tree structure to the very end, when finished all the recursive calls 
			console.log("all good!");
			return destination;

		};

		//this goes better in a filter
		/*$scope.setNameData=function (recursiveData, pattern, destination) {
			destination=$scope.getRecursiveNameData(recursiveData, pattern, destination);

			destination = destination.join('/');

			return destination;
		};*/

	    //Load the assets
		$scope.loadAssetFile=function(id){


			dataService.getAssetFile(id).then(function(assetFileResult){


				$scope.shareFile=assetFileResult;
				//console.log($scope.shareFile);
				console.log(JSON.stringify($scope.shareFile, null, 4));

				//set regions
				$scope.regions = $scope.getRecursiveNameData($scope.shareFile.region, apiConstants.API_DATA_PATTERN_REGION, $scope.regions);
				console.log($scope.regions);

				//set risk families
				$scope.risk_families = $scope.getRecursiveNameData($scope.shareFile.risk_family, apiConstants.API_DATA_PATTERN_RISK_FAMILY, $scope.risk_families);
				console.log($scope.risk_families);

				//set sectors
				$scope.sectors= $scope.getRecursiveNameData($scope.shareFile.sector, apiConstants.API_DATA_PATTERN_SECTOR, $scope.sectors);
				console.log($scope.sectors);

			}).catch(function(reason){

			    //if exceptions call the traceService catcher with a message and the exception object 
			    traceService.catcher(reason)(reason);
			    $window.alert(reason);	

			});

		};

		
		



		$scope.loadAssetFile($routeParams.id);
		
	}

})();