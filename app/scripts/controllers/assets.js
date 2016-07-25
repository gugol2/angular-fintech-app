(function () {

	'use strict';

	/**
	 * @ngdoc function
	 * @name angularFinancialPortalApp.controller:AssetsCtrl
	 * @description
	 * # AssetsCtrl
	 * Controller of the angularFinancialPortalApp
	 */
	 var app= angular.module('angularFinancialPortalApp');

	 app.controller('AssetsCtrl', [ '$scope', 'dataService', '$window', 'traceService', 'sharingService', 'apiConstants', AssetsCtrl]);

	 function AssetsCtrl($scope, dataService, $window, traceService, sharingService, apiConstants) {

	 	$scope.shares=[];
	 	$scope.numPerPage = 5;
	 	$scope.isError;

	 	//Table functionality
	 	$scope.reverse = true;  
	 	$scope.currentPage = 1;  
	 	$scope.maxNumberPaginationLinks=5;
	 	$scope.order = function (predicate) {
	 		//This way we always do the first ordering as descending   
	 		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
	 		$scope.predicate = predicate;
	 	}; 

		//Load the assets
		$scope.loadAssets=function(){
			$scope.isLoading=true;
			//API call
			dataService.getAssets().then(function(assetsResult){

				$scope.shares=assetsResult;

				//Check that the response is not empty
				if($scope.shares && $scope.shares.length){
					sharingService.setAssets($scope.shares);
					$scope.isLoading=false;  
				}
				else{
					traceService.catcher(apiConstants.EMPTY_DATA_API_MSG)(200);
			    	$window.alert(apiConstants.EMPTY_DATA_API_MSG);
			    	$scope.isLoading=false;
			    	$scope.isError=apiConstants.EMPTY_DATA_API_MSG;
				}

			}).catch(function(reason){
			    //if exceptions call the traceService catcher with a message and the exception object 
			    traceService.catcher(reason.statusText)(reason.status);
			    $window.alert(reason.statusText);
			    $scope.isLoading=false;
			    $scope.isError=reason.statusText;
			});

		};

		$scope.loadAssets();

	}
	
})();


