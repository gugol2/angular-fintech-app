'use strict';

describe('Service: utilService', function () {

  // load the service's module
  beforeEach(module('angularFinancialPortalApp'));

  // instantiate service
  var utilService;
  beforeEach(inject(function (_utilService_) {
    utilService = _utilService_;
  }));

  it('this dummy checks injecting', function () {
    expect(utilService).toBeDefined();
  });

  it('should get the name data of a node recursively and return the destination array filled with the ys found', function () {
    //var
    var recursiveData={
      'id': 900000,
      'name': 'High',
      'node_level2': {
        'id': 901000,
        'name': 'Medium',
        'node_level3': {
          'id': 901095,
          'name': 'Low'
        }
      }
      
    };

    var pattern=/(node_level\d*)/;

    var destination=[];
    var result=[];
    var expected=['High','Medium','Low'];

    //call
    result = utilService.getRecursiveNameData(recursiveData, pattern, destination);
    
    //expects
    expect(result).toEqual(expected);

  });


  it('should transorm an array of objects into an array of arrays', function () {
    //var
    var arrayObjects=[
    {
      'x': 5,
      'y': 112.7099990845
    },
    {
      'x': 50,
      'y': 110.2200012207
    },
    {
      'x': 25,
      'y': 108.4499969482
    }
    ];


    var result=[];
    var expected=[[5, 112.7099990845], [50, 110.2200012207], [25, 108.4499969482]];

    //call
    result = utilService.mapObjectToArray(arrayObjects);
    
    //expects
    expect(result).toEqual(expected);
    expect(result.length).toEqual(arrayObjects.length);

  });


  it('should vonvert a Date object to a string, using locale conventions', function () {
    //var
    var result;

    //expect before call
    expect(result).not.toBeDefined();

    //call
    result = utilService.newLocaleStringDate();
    
    //expect after call
    expect(result).toEqual(jasmine.any(String));
    expect(result).toBeDefined();

  });

});

