'use strict';

describe('Service: traceService', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var traceService;
  beforeEach(inject(function (_traceService_) {
    traceService = _traceService_;

    spyOn(traceService, 'catcher').and.callThrough();
  }));

  it('should call the traceService catcher function with an error message', function () {
    
    var error= 'XHR error';
    
    var catcherResult=traceService.catcher(error);
    
    expect(traceService.catcher).toHaveBeenCalledWith(error);
    
    expect(catcherResult).toEqual(jasmine.any(Function));
  });

});
