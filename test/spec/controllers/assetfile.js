'use strict';

describe('Controller: AssetfileCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFinancialPortalApp'));

  var AssetfileCtrl,
    scope, dataService, $window, traceService, sharingService, apiConstants, utilService, $location, $routeParams, localStorageService;

  var $q ,deferred;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _dataService_, _$window_, _traceService_, _sharingService_, _apiConstants_, _utilService_, _$q_, _$location_, _$routeParams_, _localStorageService_) {
    scope = $rootScope.$new();
    dataService=_dataService_;
    traceService=_traceService_;
    sharingService=_sharingService_;
    apiConstants=_apiConstants_;
    utilService=_utilService_;
    $q=_$q_;
    $window=_$window_;
    $location=_$location_;
    $routeParams=_$routeParams_;
    localStorageService=_localStorageService_;

    // We use the $q service to create a mock instance of defer
    deferred = $q.defer();

    // Use a Jasmine Spy to return the deferred promise
    spyOn(dataService, 'getAssetFile').and.returnValue(deferred.promise);


    AssetfileCtrl = $controller('AssetfileCtrl', {
      $scope: scope,
      // place here mocked dependencies
      dataService:dataService,
      traceService:traceService,
      sharingService:sharingService,
      apiConstants: apiConstants,
      utilService: utilService,
      localStorageService:localStorageService
    });
  }));

  //$scope variables
  it('this dummy checks injecting of settings controller', function () {
    expect(AssetfileCtrl).toBeDefined();
  });

  it('should check that the current path is active', function () {
    $routeParams.id='1';
    
    expect(scope.isActive(1)).toBe(true);
    expect(scope.isActive(2)).toBe(false); 
  });


  it('should check that the current path is active', function () {
    $routeParams.id='1';
    
    expect(scope.isActive(1)).toBe(true);
    expect(scope.isActive(2)).toBe(false); 
  });


  it('should set a few variables of the scope when the call to loadAssetFile is successful and the response is not empty', function () {
    //vars
    var assetFileResult={
      'id': 1,
      'name': 'Anything',
      'region' : 'any region',
      'riskfamily' : 'any risk',
      'sector' : 'any sector',
      'currency': {
        'symbol': '€',
        'color': '#31319C'
      },
      'prices': [
        {
          'date': '1999-01-01T00:00:00.000Z',
          'value': 109.0899963379
        },
        {
          'date': '1999-01-04T00:00:00.000Z',
          'value': 110.5800018311
        }
      ]
    };

    //spies
    spyOn(sharingService,'getAssets'); 
    spyOn(scope,'getRegions'); 
    spyOn(scope,'getRiskFamilies'); 
    spyOn(scope,'getSectors'); 
    spyOn(utilService,'mapObjectToArray');
    spyOn(scope,'fillGraph').and.callThrough();

    //call
    scope.loadAssetFile(1);
    
    //expects
    expect(dataService.getAssetFile).toHaveBeenCalled();
    expect(dataService.getAssetFile).toHaveBeenCalledWith(1);

    // Setup the data we wish to return for the .then function in the controller
    deferred.resolve(assetFileResult);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.shareFile).toEqual(jasmine.any(Object));

    expect(scope.getRegions).toHaveBeenCalled();
    expect(scope.getRegions).toHaveBeenCalledWith(assetFileResult.region, apiConstants.API_DATA_PATTERN_REGION, scope.regions);

    expect(scope.getRiskFamilies).toHaveBeenCalled();
    //expect(scope.getRiskFamilies).toHaveBeenCalledWith(assetFileResult.risk_family, apiConstants.API_DATA_PATTERN_RISK_FAMILY, scope.riskFamilies);

    expect(scope.getSectors).toHaveBeenCalled();
    expect(scope.getSectors).toHaveBeenCalledWith(assetFileResult.sector, apiConstants.API_DATA_PATTERN_SECTOR, scope.sectors);

    expect(utilService.mapObjectToArray).toHaveBeenCalled();
    expect(utilService.mapObjectToArray).toHaveBeenCalledWith(assetFileResult.prices);

    expect(scope.fillGraph).toHaveBeenCalled();
    expect(scope.fillGraph).toHaveBeenCalledWith();

    //check that fillGraph does its job
    expect(scope.chartConfig.series[0].name).toEqual(assetFileResult.id);
    expect(scope.chartConfig.series[0].color).toEqual(assetFileResult.currency.color);
    expect(scope.chartConfig.series[0].id).toEqual(assetFileResult.id);
    expect(scope.chartConfig.series[0].data).toEqual(scope.prices);

    expect(scope.chartConfig.yAxis.title.text).toEqual('Price ' + scope.shareFile.currency.symbol);
    expect(scope.chartConfig.subtitle.text).toEqual('Source: jsonstub.com/etsfintech/symbols/' +scope.shareFile.id);

    expect(scope.chartConfig.loading).toBe(false);

  });


  it('should set a few variables of the scope when the call to loadAssetFile is successful but the response is empty', function () {
    //vars
    var assetFileResult={};

    //spies
    spyOn(sharingService,'getAssets'); 
    spyOn(scope,'getRegions'); 
    spyOn(scope,'getRiskFamilies'); 
    spyOn(scope,'getSectors');
    spyOn(utilService,'mapObjectToArray'); 
    spyOn(scope,'fillGraph');
    spyOn(traceService,'catcher').and.callThrough();
    spyOn($window, 'alert'); 

    //call
    scope.loadAssetFile(1);
    
    //expects
    expect(dataService.getAssetFile).toHaveBeenCalled();
    expect(dataService.getAssetFile).toHaveBeenCalledWith(1);

    // Setup the data we wish to return for the .then function in the controller
    deferred.resolve(assetFileResult);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.shareFile).toEqual(jasmine.any(Object));

    expect(scope.getRegions).not.toHaveBeenCalled();
    expect(scope.getRiskFamilies).not.toHaveBeenCalled();
    expect(scope.getSectors).not.toHaveBeenCalled();

    expect(utilService.mapObjectToArray).not.toHaveBeenCalled();

    expect(scope.fillGraph).not.toHaveBeenCalled();
    expect(scope.fillGraph).not.toHaveBeenCalledWith();

    expect(traceService.catcher).toHaveBeenCalled();
    expect(traceService.catcher).toHaveBeenCalledWith(apiConstants.EMPTY_DATA_API_MSG);

    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(apiConstants.EMPTY_DATA_API_MSG);
  
  });


  it('should alert the reason and trace the reason and the status when the call to loadAssetFile is not successful', function () {
    //vars
    var assetFileResultFailed= { msg: 'whatever', status: 400}; 

    //spies
    spyOn(sharingService,'getAssets'); 
    spyOn(scope,'getRegions'); 
    spyOn(scope,'getRiskFamilies'); 
    spyOn(scope,'getSectors'); 
    spyOn(utilService,'mapObjectToArray');
    spyOn(scope,'fillGraph');
    spyOn(traceService,'catcher').and.callThrough();
    spyOn($window, 'alert'); 

    //call
    scope.loadAssetFile(1);
    
    //expects
    expect(dataService.getAssetFile).toHaveBeenCalled();
    expect(dataService.getAssetFile).toHaveBeenCalledWith(1);

    // Setup the data we wish to return for the .then function in the controller
    deferred.reject(assetFileResultFailed);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.shareFile).toBeUndefined();

    expect(scope.getRegions).not.toHaveBeenCalled();
    expect(scope.getRiskFamilies).not.toHaveBeenCalled();
    expect(scope.getSectors).not.toHaveBeenCalled();

    expect(utilService.mapObjectToArray).not.toHaveBeenCalled();

    expect(scope.fillGraph).not.toHaveBeenCalled();
    expect(scope.fillGraph).not.toHaveBeenCalledWith();

    expect(traceService.catcher).toHaveBeenCalled();
    expect(traceService.catcher).toHaveBeenCalledWith(assetFileResultFailed.msg);

    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(assetFileResultFailed.msg);
  
  });


});
