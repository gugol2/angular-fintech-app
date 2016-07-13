'use strict';

describe('Service: apiConstants', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var apiConstants;
  beforeEach(inject(function (_apiConstants_) {
    apiConstants = _apiConstants_;
  }));

  it('should check the apiConstants', function () {
    expect(apiConstants).not.toBe(null);
    expect(apiConstants).toBeDefined();

    //headers is an object
    expect(apiConstants.API_HEADERS).toEqual(jasmine.any(Object));

    expect(apiConstants.API_URL).toEqual(jasmine.any(String));

    //regex patterns are not strings
    expect(apiConstants.API_DATA_PATTERN_REGION).not.toEqual(jasmine.any(String));
    expect(apiConstants.API_DATA_PATTERN_RISK_FAMILY).not.toEqual(jasmine.any(String));
    expect(apiConstants.API_DATA_PATTERN_SECTOR).not.toEqual(jasmine.any(String));

    expect(apiConstants.EMPTY_INPUT_MSG).toEqual(jasmine.any(String));
    expect(apiConstants.EMPTY_DATA_API_MSG).toEqual(jasmine.any(String));
    
  });

});
