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
		///tab/navbar functionality
	    $scope.isActive = function (viewLocation) {
		 	return viewLocation === $location.path();
		};

	}

})();


