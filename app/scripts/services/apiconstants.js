(function () {
	
	'use strict';

	/**
	 * @ngdoc service
	 * @name angularFinancialPortalApp.apiConstants
	 * @description
	 * # apiConstants
	 * Constant in the angularFinancialPortalApp.
	 */
	var app = angular.module('angularFinancialPortalApp');
	
	app.constant('apiConstants', 
		{
			'API_HEADERS':{
				'Content-Type' : 'application/json',
				'JsonStub-User-Key' : '9facef2e-9583-4a83-9f08-c87159f1c113',
				'JsonStub-Project-Key' : '6ed070c1-b334-4612-8fa8-169c5e45baef'
			},
			'API_URL' : '//jsonstub.com/etsfintech/symbols',
			'API_DATA_PATTERN_REGION' : /(region_level\d*)/,
			'API_DATA_PATTERN_RISK_FAMILY' : /(sub_family)/,
			'API_DATA_PATTERN_SECTOR' : /(sector_level\d*)/,
			'EMPTY_INPUT_MSG' : 'The comment can\'t be empty!'
		}
	);

})();



