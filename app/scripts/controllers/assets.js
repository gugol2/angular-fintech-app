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

	 	//Table functionality
	 	$scope.reverse = true;  
	 	$scope.currentPage = 1;  
	 	$scope.order = function (predicate) {  
	 		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
	 		$scope.predicate = predicate;
	 	}; 

		//Load the assets
		$scope.loadAssets=function(){

			//API call
			dataService.getAssets().then(function(assetsResult){

				$scope.shares=assetsResult;

				//Check that the response is not empty
				if($scope.shares && $scope.shares.length){
					$scope.totalItems = $scope.shares.length;  
					$scope.numPerPage = 5;  
					$scope.paginate = function (value) {  
						var begin, end, index;  
						begin = ($scope.currentPage - 1) * $scope.numPerPage;  
						end = begin + $scope.numPerPage;  
						index = $scope.shares.indexOf(value);  
						return (begin <= index && index < end);  
					};

					sharingService.setAssets($scope.shares);  
				}
				else{
					traceService.catcher(apiConstants.EMPTY_DATA_API_MSG)(200);
			    	$window.alert(apiConstants.EMPTY_DATA_API_MSG);
				}

			}).catch(function(reason){
			    //if exceptions call the traceService catcher with a message and the exception object 
			    traceService.catcher(reason.msg)(reason.status);
			    $window.alert(reason.msg);

			});

		};

		$scope.loadAssets();

	}
	
})();


