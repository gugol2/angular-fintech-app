(function () {
	
	'use strict';

	/**
	 * @ngdoc filter
	 * @name angularFinancialPortalApp.filter:formatAssetData
	 * @function
	 * @description
	 * # formatAssetData
	 * Filter in the angularFinancialPortalApp.
	 */
	var app= angular.module('angularFinancialPortalApp');

	app.filter('formatAssetData', function () {
	    return function (input) {
	      return input.join('/');
	    };
	});


})();
