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

    expect(apiConstants.API_HEADERS).toEqual(jasmine.any(Object));
    
  });

});
