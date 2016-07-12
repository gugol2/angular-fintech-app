(function () {

	'use strict';

	/**
	 * @ngdoc function
	 * @name angularFinancialPortalApp.controller:HeaderCtrl
	 * @description
	 * # HeaderCtrl
	 * Controller of the angularFinancialPortalApp
	 */
	var app= angular.module('angularFinancialPortalApp');
	  
	app.controller('HeaderCtrl', ['$scope', '$location', HeaderCtrl]);

	function HeaderCtrl($scope,$location) {

	    $scope.isActive = function (viewLocation) {
		 	//console.log($location.path());
		 	return viewLocation === $location.path();
		};

	}

})();


