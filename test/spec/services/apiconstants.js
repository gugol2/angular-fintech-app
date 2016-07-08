'use strict';

describe('Service: apiConstants', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var apiConstants;
  beforeEach(inject(function (_apiConstants_) {
    apiConstants = _apiConstants_;
  }));

  it('should do something', function () {
    expect(!!apiConstants).toBe(true);
  });

});
