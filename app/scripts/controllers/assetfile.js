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

	app.controller('AssetfileCtrl', ['$scope', 'dataService', '$window', '$routeParams', AssetfileCtrl]);

	function AssetfileCtrl($scope, dataService, $window, $routeParams) {

	    //Load the assets
		$scope.loadAssetFile=function(id){


			dataService.getAssetFile(id).then(function(assetFileResult){


				$scope.shareFile=assetFileResult;
				//console.log($scope.shareFile);
				console.log(JSON.stringify($scope.shareFile, null, 4));

				var patt=/(region_.*)/;
				$scope.getRecursiveData($scope.shareFile.region, patt);
				

			}).catch(function(reason){

			    //if exceptions call the traceService catcher with a message and the exception object 
			    //traceService.catcher(reason)(reason);
			    $window.alert(reason);	

			});

		};

		$scope.regions=[];

		$scope.getRecursiveData=function(recursiveData, pattern) {


			var match;

			
			if(recursiveData && recursiveData.name){ 
				$scope.regions.push(recursiveData.name);

				for (var prop in recursiveData) {

					if((match=pattern.exec(prop)) !== null){
						return $scope.getRecursiveData(recursiveData[prop]);
					}
				}
			}else{
				console.log($scope.regions);
				return $scope.regions;
			}

		}



		$scope.loadAssetFile($routeParams.id);
		
	}

})()