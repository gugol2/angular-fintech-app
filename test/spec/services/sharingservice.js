'use strict';

describe('Service: sharingService', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var sharingService;
  beforeEach(inject(function (_sharingService_) {
    sharingService = _sharingService_;
  }));

  it('should check the sharingService', function () {
    expect(sharingService).not.toBe(null);
    expect(sharingService).toBeDefined(); 
  });

  it('should check that sharingService.getAssets is an array', function () {
    var assets = sharingService.getAssets();
    expect(assets).toEqual(jasmine.any(Array));
  });

  it('should check that sharingService.setAssets sets an array', function () {
    //passed an array
    var assetsInput=[{test:'test1'},{test:'test2'}];
    sharingService.setAssets(assetsInput);

    var assets;
    expect(assets).not.toEqual(jasmine.any(Array));

    assets = sharingService.getAssets();
    expect(assets).toEqual(assetsInput);

    //passed a String
    assetsInput='hola';
    sharingService.setAssets(assetsInput);

    assets = sharingService.getAssets();
    expect(assets).toEqual(assetsInput);
  });

});
