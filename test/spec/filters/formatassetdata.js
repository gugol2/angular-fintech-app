'use strict';

describe('Filter: formatAssetData', function () {

  // load the filter's module
  beforeEach(module('angularFinancialPortalApp'));

  // initialize a new instance of the filter before each test
  var formatAssetData;
  beforeEach(inject(function ($filter) {
    formatAssetData = $filter('formatAssetData');
  }));

  it('should return the input prefixed with "formatAssetData filter:"', function () {
    var text = 'angularjs';
    expect(formatAssetData(text)).toBe('formatAssetData filter: ' + text);
  });

});
