(function () {

	'use strict';

	/**
	 * @ngdoc function
	 * @name angularFinancialPortalApp.controller:AssetfileCtrl
	 * @description
	 * # AssetfileCtrl
	 * Controller of the angularFinancialPortalApp
	 */
	var app= angular.module('angularFinancialPortalApp');

	app.controller('AssetfileCtrl', ['$scope', 'dataService', '$window', '$routeParams', 'apiConstants', 'traceService', 'utilService', '$location', 'sharingService', '$timeout', AssetfileCtrl]);

	function AssetfileCtrl($scope, dataService, $window, $routeParams, apiConstants, traceService, utilService, $location, sharingService, $timeout) {

		$scope.shareFile;
		$scope.regions=[];
		$scope.risk_families=[];
		$scope.sectors=[];
		$scope.prices=[];
		$scope.location=$location.path();
		console.log($scope.location);

		//tab functionality
		$scope.isActive = function (viewLocation) {
		 	//console.log($location.path());
		 	return viewLocation === $scope.location;
		};


		$scope.getRegions=function (recursiveRegionData, pattern, destination) {
			$scope.regions=utilService.getRecursiveNameData(recursiveRegionData, pattern, destination);
		}

		$scope.getRiskFamilies=function (recursiveRiskFamiliesData, pattern, destination) {
			$scope.risk_families=utilService.getRecursiveNameData(recursiveRiskFamiliesData, pattern, destination);
		}

		$scope.getSectors=function (recursiveSectorData, pattern, destination) {
			$scope.sectors=utilService.getRecursiveNameData(recursiveSectorData, pattern, destination);
		}

		$scope.createGraph=function (id) {
			$scope.chartConfig = {
			        options: {
			            chart: {
			                zoomType: 'x'
			            },
			            rangeSelector: {
			                enabled: true
			            },
			            navigator: {
			                enabled: true
			            },
			            credits: {
							enabled: false
						}
					},
			        series: [
					],
			        title: {
			            text:'Price History'
			        },
			        subtitle: {
			            text: 'Source: jsonstub.com/etsfintech/symbols/'+id
			        },

			        loading: false,
			        useHighStocks: true,

			        xAxis: {
			        	type: "datetime",
			        	title: {
			            	text:'Date'
			            }
			        },
			        yAxis: {
			            title: {
			              text:'Price ' +  $scope.shareFile.currency.symbol
			            }
			        }
			    };

				$scope.chartConfig.series.push({
					name: id,
			    	color: '#290053',
			        id: 1,
			        data: $scope.prices
			    });
		}

	    //Load the assets
		$scope.loadAssetFile=function(id){


			dataService.getAssetFile(id).then(function(assetFileResult){

				$scope.shareFile=assetFileResult;
				//console.log($scope.shareFile);
				//console.log(JSON.stringify($scope.shareFile, null, 4));

				//set regions
				$scope.getRegions($scope.shareFile.region, apiConstants.API_DATA_PATTERN_REGION, $scope.regions);
				console.log($scope.regions);

				//set risk families
				$scope.getRiskFamilies($scope.shareFile.risk_family, apiConstants.API_DATA_PATTERN_RISK_FAMILY, $scope.risk_families);
				console.log($scope.risk_families);

				//set sectors
				$scope.getSectors($scope.shareFile.sector, apiConstants.API_DATA_PATTERN_SECTOR, $scope.sectors);
				console.log($scope.sectors);

				$scope.prices=utilService.mapObjectToArray($scope.shareFile.prices);
				//console.log($scope.shareFile.prices);
				//console.log($scope.prices);

				//draw the graph
				$timeout(function() {
				    $scope.createGraph(id);
				}, 2000);
				

				

			}).catch(function(reason){

			    //if exceptions call the traceService catcher with a message and the exception object 
			    traceService.catcher(reason.error)(status);
			    $window.alert(reason.error);	

			});

		};

		//fetch the info for the navbar
		$scope.shares=sharingService.getAssets();

		//load the asset info
		$scope.loadAssetFile($routeParams.id);


		/*var vm= this;

	 	var todosInStore = localStorageService.get('todos');*/

	 	//$scope.comments = todosInStore || [];

	 	$scope.comments =[];

	 	/*use the angular $watch listener to watch for changes in the value of $scope.comments. 
	 	If someone adds or removes a todo, it will then keep our local storage todos datastore in sync.
	 	Note the watched value needed returned when using $scope and this*/
	 	/*$scope.$watch(
	 		function () {
		        return $scope.comments;
		    }, 
		    function () {
	      		localStorageService.set("todos", $scope.comments);
	    		},
	    	true
	    );*/

	 	$scope.addComment= function () {
	 		$scope.comments.push($scope.commenttoadd);
	 		$scope.commenttoadd='';
	 	};

	 	$scope.editComment = function (index, comment) {
	 		$scope.comments[index]= comment;
	 	};

	 	$scope.removeComment = function (index) {
	 		$scope.comments.splice(index,1);
	 	};
		
	}

})();