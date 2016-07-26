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
    spyOn(scope, 'setChartErrorColor');
    spyOn(scope, 'setChartLoading');   

    //check before call
    expect(scope.isError).toBe(false);

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
    expect(scope.setChartErrorColor).toHaveBeenCalled();
    expect(scope.setChartErrorColor).toHaveBeenCalledWith(apiConstants.CHART_ERROR_COLOR);
    expect(scope.setChartLoading).toHaveBeenCalled();
    expect(scope.setChartLoading).toHaveBeenCalledWith(apiConstants.EMPTY_DATA_API_MSG);
    expect(scope.isError).toEqual(apiConstants.EMPTY_DATA_API_MSG);

    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(apiConstants.EMPTY_DATA_API_MSG);
  
  });


  it('should alert the reason and trace the reason and the status when the call to loadAssetFile is not successful', function () {
    //vars
    var assetFileResultFailed= { statusText: 'whatever', status: 400}; 

    //spies
    spyOn(sharingService,'getAssets'); 
    spyOn(scope,'getRegions'); 
    spyOn(scope,'getRiskFamilies'); 
    spyOn(scope,'getSectors'); 
    spyOn(utilService,'mapObjectToArray');
    spyOn(scope,'fillGraph');
    spyOn(traceService,'catcher').and.callThrough();
    spyOn($window, 'alert'); 
    spyOn(scope, 'setChartErrorColor');
    spyOn(scope, 'setChartLoading');   

    //check before call
    expect(scope.isError).toBe(false);

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
    expect(traceService.catcher).toHaveBeenCalledWith(assetFileResultFailed.statusText);
    expect(scope.setChartErrorColor).toHaveBeenCalled();
    expect(scope.setChartErrorColor).toHaveBeenCalledWith(apiConstants.CHART_ERROR_COLOR);
    expect(scope.setChartLoading).toHaveBeenCalled();
    expect(scope.setChartLoading).toHaveBeenCalledWith(assetFileResultFailed.statusText);
    expect(scope.isError).toEqual(assetFileResultFailed.statusText);

    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(assetFileResultFailed.statusText);
  
  });
  

  it('should check the localStorage', function () {
    //vars
    var id='1';
    var comment= 'testing';

    //spies 
    spyOn(localStorageService, 'get').and.callThrough();
 
    //call when storage empty
    scope.storageLocal(id);
     
    //expects
    expect(localStorageService.get).toHaveBeenCalled();
    expect(localStorageService.get).toHaveBeenCalledWith(id);

    expect(scope.comments).toEqual([]);

    //call when storage not empty
    localStorageService.set(id, JSON.stringify(comment));
    scope.storageLocal(id);
     
    //expects
    expect(localStorageService.get).toHaveBeenCalled();
    expect(localStorageService.get).toHaveBeenCalledWith(id);

    expect(scope.comments).toEqual(comment);
  
  });

  it('should check $scope.addComment', function () {
    //vars
    scope.commenttoadd=undefined;

    //spies
    spyOn($window, 'alert');

    //call with empty value
    scope.addComment();

    //expects
    expect(scope.comments).toEqual([]);
    expect(scope.comments.length).toEqual(0);
    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(apiConstants.EMPTY_INPUT_MSG);

    //call with value
    scope.commenttoadd='anything';
    scope.addComment();

    //expects
    expect(scope.comments.length).toBeGreaterThan(0);
    //empty the value
    expect(scope.commenttoadd).toEqual('');

  });

  it('should check $scope.editComment', function () {
    //vars
    var index= 0;
    var text= '';
    var comments= [{text: 'anything', date: '10 de julio de 2016, 12:31:21 CEST'}];
    scope.comments=[{text: 'anything', date: '10 de julio de 2016, 12:31:21 CEST'}];

    //spies
    spyOn($window, 'alert');

    //call with empty value
    scope.editComment(index, text);

    //expects
    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(apiConstants.EMPTY_INPUT_MSG);

    expect(scope.comments.length).toEqual(1);   
    expect(scope.comments).toEqual(comments);
    expect(scope.comments[0].text).toEqual(comments[0].text);
    expect(scope.comments[0].date).toEqual(comments[0].date);   

    //call with value
    text='a few words';
    scope.editComment(index, text);

    //expects
    expect(scope.comments.length).toEqual(1);
    expect(scope.comments).not.toEqual(comments);
    expect(scope.comments[0].text).toEqual(text);
    expect(scope.comments[0].date).not.toEqual(comments[0].date);
  });


  it('should check $scope.removeComment', function () {
    //vars
    var comments=[{text: 'anything', date: '10 de julio de 2016, 12:31:21 CEST'}, {text: 'a few words', date: '11 de julio de 2016, 12:31:21 CEST'}];
    scope.comments=[{text: 'anything', date: '10 de julio de 2016, 12:31:21 CEST'}, {text: 'a few words', date: '11 de julio de 2016, 12:31:21 CEST'}];

    //expect
    expect(scope.comments.length).toEqual(2);

    //call with empty value
    scope.removeComment(0);

    //expects
    expect(scope.comments.length).toEqual(1);
    expect(scope.comments).toEqual([comments[1]]);
  });


  it('should check that sharingService.getAssets fills scope.shares', function () {
    //passed an array
    var assetsInput=[{test:'test1'},{test:'test2'}];

    //spies
    spyOn(sharingService, 'getAssets').and.callThrough();

    //before
    expect(scope.shares).toEqual([]);

    //call
    sharingService.setAssets(assetsInput);
    scope.getShares();

    //after
    expect(scope.shares).toEqual(jasmine.any(Array));
    expect(scope.shares).toEqual(assetsInput);

  });


});
