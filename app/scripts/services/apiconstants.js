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
				/*'Content-Type' : 'application/json',
				'JsonStub-User-Key' : '9facef2e-9583-4a83-9f08-c87159f1c113',
				'JsonStub-Project-Key' : '6ed070c1-b334-4612-8fa8-169c5e45baef'*/
				'Content-Type': 'application/json',
		        'JsonStub-User-Key': '02623b16-56ad-4b84-80a5-03142b50458d',
		        'JsonStub-Project-Key': '0ebb2867-8ec9-44ba-af70-39155b39454b'
			},
			'API_URL' : '//jsonstub.com/fintechapi/assets',
			/*'API_URL' : '//jsonstub.com/your/first/api',*/
			/*'API_URL' : '//google.es',*/
			'API_DATA_PATTERN_REGION' : /(region_level\d*)/,
			'API_DATA_PATTERN_RISK_FAMILY' : /(sub_family)/,
			'API_DATA_PATTERN_SECTOR' : /(sector_level\d*)/,
			'EMPTY_INPUT_MSG' : 'The comment can\'t be empty!',
			'EMPTY_DATA_API_MSG' : 'The api response is empty!'
		}
	);

})();



