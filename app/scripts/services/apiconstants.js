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
				'Content-Type': 'application/json',
		        'JsonStub-User-Key': '02623b16-56ad-4b84-80a5-03142b50458d',
		        'JsonStub-Project-Key': '0ebb2867-8ec9-44ba-af70-39155b39454b'
			},
			'API_URL' : '//jsonstub.com/fintechapi/assets',
			'API_DATA_PATTERN_REGION' : /(region_level\d*)/,
			'API_DATA_PATTERN_RISK_FAMILY' : /(sub_family)/,
			'API_DATA_PATTERN_SECTOR' : /(sector_level\d*)/,
			'EMPTY_INPUT_MSG' : 'The comment can\'t be empty!',
			'EMPTY_DATA_API_MSG' : 'The api response is empty!',
			'CHART_ERROR_COLOR' : '#f2dede'
		}
	);

})();



