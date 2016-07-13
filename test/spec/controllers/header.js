'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFinancialPortalApp'));

  var HeaderCtrl,
    scope, $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$location_) {
    scope = $rootScope.$new();
    $location =  _$location_;
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


  it('this dummy checks injecting of settings controller', function () {
    expect(HeaderCtrl).toBeDefined();
  });

  it('should check that the current path is active', function () {
    $location.path('/abc');
    expect(scope.isActive('/abc')).toBe(true);
    expect(scope.isActive('/')).toBe(false); 
  });

});
