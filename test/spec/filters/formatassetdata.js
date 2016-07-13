'use strict';

describe('Filter: formatAssetData', function () {

  // load the filter's module
  beforeEach(module('angularFinancialPortalApp'));

  // initialize a new instance of the filter before each test
  var formatAssetData;
  beforeEach(inject(function ($filter) {
    formatAssetData = $filter('formatAssetData');
  }));

  it('this dummy checks injecting of the filter', function () {
    expect(formatAssetData).toBeDefined();
  });

  it('should return a string with the elements of the input array separated by '/' ', function () {
    //var
    var input=['safe', 'low', 'high'];
    var output='safe/low/high';
    
    //call
    var result = formatAssetData(input);

    //expects (both are the same)
    expect(result).toEqual(output); 

  });

});
