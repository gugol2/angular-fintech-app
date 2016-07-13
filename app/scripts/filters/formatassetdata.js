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

	app.filter('formatAssetData', [formatAssetData]);

	//joins the elements of an array into a string (separated by a specified separator) and returns the string.
	function formatAssetData() {
	    return function (input) {
	      return input.join('/');
	    };
	}


})();
