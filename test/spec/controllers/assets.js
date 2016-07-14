'use strict';

describe('Controller: AssetsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFinancialPortalApp'));

  var AssetsCtrl,
    scope, dataService, $window, traceService, sharingService, apiConstants;

  var $q ,deferred;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _dataService_, _$window_, _traceService_, _sharingService_, _apiConstants_, _$q_) {
    scope = $rootScope.$new();
    dataService=_dataService_;
    traceService=_traceService_;
    sharingService=_sharingService_;
    apiConstants=_apiConstants_;
    $q=_$q_;
    $window=_$window_;

    // We use the $q service to create a mock instance of defer
    deferred = $q.defer();

    // Use a Jasmine Spy to return the deferred promise
    spyOn(dataService, 'getAssets').and.returnValue(deferred.promise);

    AssetsCtrl = $controller('AssetsCtrl', {
      $scope: scope,
      // place here mocked dependencies
      dataService:dataService,
      traceService:traceService,
      sharingService:sharingService,
      apiConstants: _apiConstants_
    });
  }));

  //$scope variables
  it('this dummy checks injecting of settings controller', function () {
    expect(AssetsCtrl).toBeDefined();
  });

  it('should set a few variables of the scope when the call to loadAssets is successful and the response is not empty', function () {
    //vars
    var assetsResult=[ 
      {
        'id': 9756,
        'name': 'Jpmorgan Investment Funds - Global Macro Opportunities Fund A Acc',
        'currency': 'EUR',
        'risk_family': 'Balanced'
      },
      {
        'id': 42736,
        'name': 'Allianz Fondsvorsorge 1977-1996 A Acc',
        'currency': 'EUR',
        'risk_family': 'Balanced'
      } 
    ];

    //spies
    spyOn(sharingService,'setAssets'); 

    //call
    scope.loadAssets();
    
    //expects
    expect(dataService.getAssets).toHaveBeenCalled();
    expect(dataService.getAssets).toHaveBeenCalledWith();

    // Setup the data we wish to return for the .then function in the controller
    deferred.resolve(assetsResult);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.shares).toEqual(jasmine.any(Array));

    expect(scope.totalItems).toEqual(assetsResult.length);
    expect(scope.numPerPage).toEqual(5);
    expect(scope.paginate).toEqual(jasmine.any(Function));

    expect(sharingService.setAssets).toHaveBeenCalled();
    expect(sharingService.setAssets).toHaveBeenCalledWith(assetsResult);
  
  });


  it('should alert and trace an EMPTY_DATA_API_MSG when the call to loadAssets is successful but the response is not empty', function () {
    //vars
    var assetsResult=[];

    //spies
    spyOn(sharingService,'setAssets'); 
    spyOn(traceService,'catcher').and.callThrough();
    spyOn($window, 'alert');

    //call
    scope.loadAssets();
    
    //expects
    expect(dataService.getAssets).toHaveBeenCalled();
    expect(dataService.getAssets).toHaveBeenCalledWith();

    // Setup the data we wish to return for the .then function in the controller
    deferred.resolve(assetsResult);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.shares).toEqual(jasmine.any(Array));

    expect(scope.totalItems).toBeUndefined();
    expect(sharingService.setAssets).not.toHaveBeenCalled();

    expect(traceService.catcher).toHaveBeenCalled();
    expect(traceService.catcher).toHaveBeenCalledWith(apiConstants.EMPTY_DATA_API_MSG);

    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(apiConstants.EMPTY_DATA_API_MSG);
  
  });


  it('should alert the reason and trace the reason and the status when the call to loadAssets is not successful', function () {
    //vars
    var assetsResultFailed= { msg: 'whatever', status: 400}; 

    //spies
    spyOn(sharingService,'setAssets'); 
    spyOn(traceService,'catcher').and.callThrough();
    spyOn($window, 'alert');

    //call
    scope.loadAssets();
    
    //expects
    expect(dataService.getAssets).toHaveBeenCalled();
    expect(dataService.getAssets).toHaveBeenCalledWith();

    // Setup the data we wish to return for the .then function in the controller
    deferred.reject(assetsResultFailed);

    // We have to call apply for this to work
    scope.$apply();

    // Since we called apply, not we can perform our assertions
    expect(scope.shares).toBeUndefined();

    expect(scope.totalItems).toBeUndefined();
    expect(sharingService.setAssets).not.toHaveBeenCalled();

    expect(traceService.catcher).toHaveBeenCalled();
    expect(traceService.catcher).toHaveBeenCalledWith(assetsResultFailed.msg);

    expect($window.alert).toHaveBeenCalled();
    expect($window.alert).toHaveBeenCalledWith(assetsResultFailed.msg);
  
  });

});

