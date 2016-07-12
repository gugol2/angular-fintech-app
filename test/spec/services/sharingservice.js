'use strict';

describe('Service: sharingService', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var sharingService;
  beforeEach(inject(function (_sharingService_) {
    sharingService = _sharingService_;
  }));

  it('should do something', function () {
    expect(!!sharingService).toBe(true);
  });

});
