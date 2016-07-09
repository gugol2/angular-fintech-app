'use strict';

describe('Service: traceService', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var traceService;
  beforeEach(inject(function (_traceService_) {
    traceService = _traceService_;
  }));

  it('should do something', function () {
    expect(!!traceService).toBe(true);
  });

});
