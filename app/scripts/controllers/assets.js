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

	 app.controller('AssetsCtrl', [ '$scope', 'dataService', '$window', 'traceService', 'sharingService', AssetsCtrl]);

	 function AssetsCtrl($scope, dataService, $window, traceService, sharingService) {

	 	//Table functionality
	 	$scope.reverse = true;  
	 	$scope.currentPage = 1;  
	 	$scope.order = function (predicate) {  
	 		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
	 		$scope.predicate = predicate;
	 	}; 

		//Load the assets
		$scope.loadAssets=function(){


			dataService.getAssets().then(function(assetsResult){


				$scope.shares=assetsResult;
				//console.log($scope.shares);

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



			}).catch(function(reason){

			    //if exceptions call the traceService catcher with a message and the exception object 
			    traceService.catcher(reason.error)(status);
			    $window.alert(reason.error);

			});

		};

		$scope.loadAssets();

	}
	
})();


