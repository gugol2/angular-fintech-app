'use strict';

describe('Service: dataService', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var dataService, $rootScope, deferred, $q, validId, invalidId;

  beforeEach(inject(function (_dataService_, _$rootScope_, _$q_) {
    dataService = _dataService_;
    $rootScope = _$rootScope_;
    $q = _$q_;
    deferred = $q.defer();

    spyOn(dataService, 'getAssets').and.returnValue(deferred.promise);
    spyOn(dataService, 'getAssetFile').and.returnValue(deferred.promise);

    validId=57400;
    invalidId=-1;
  }));

  it('should resolve the promise from the getAssets function', function () {
    //var
    var success='success api assets service response';
    var result;

    // This will call the .then function in the controller
    deferred.resolve(success); 

    dataService.getAssets().then(function(returnFromPromise) {
      result = returnFromPromise;
    }); 

    // promises are resolved/dispatched only on next $digest cycle
    $rootScope.$apply();

    expect(result).toBe(success);
  });

  it('should reject the promise from the getAssets function', function () {
    //var
    var rejection='failed api assets service response';
    var result;

    // This will call the .catch function in the controller
    deferred.reject(rejection);

    dataService.getAssets().catch(function(returnFromPromise) {
      result = returnFromPromise;
    });
    
    // promises are resolved/dispatched only on next $digest cycle
    $rootScope.$apply();

    expect(result).toBe(rejection);
  });

  it('should resolve the promise from the getAssetFile function', function () {
    //var
    var success='success api asset file service response';
    var result;

    // This will call the .then function in the controller
    deferred.resolve(success); 

    dataService.getAssetFile(validId).then(function(returnFromPromise) {
      result = returnFromPromise;
    }); 

    // promises are resolved/dispatched only on next $digest cycle
    $rootScope.$apply();

    expect(result).toBe(success);
  });

  it('should reject the promise from the getAssetFile function', function () {
    //var
    var rejection='failed api asset file service response';
    var result;

    // This will call the .catch function in the controller
    deferred.reject(rejection);

    dataService.getAssetFile(invalidId).catch(function(returnFromPromise) {
      result = returnFromPromise;
    });
    
    // promises are resolved/dispatched only on next $digest cycle
    $rootScope.$apply();

    expect(result).toBe(rejection);
  });


});
