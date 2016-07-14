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

	app.controller('AssetfileCtrl', ['$scope', 'dataService', '$window', '$routeParams', '$location', 'apiConstants', 'traceService', 'utilService', 'sharingService', 'localStorageService', AssetfileCtrl]);

	function AssetfileCtrl($scope, dataService, $window, $routeParams, $location, apiConstants, traceService, utilService, sharingService, localStorageService) {

		$scope.regions=[];
		$scope.riskFamilies=[];
		$scope.sectors=[];
		$scope.prices=[];
		$scope.location=$location.path();

		//draw chart
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
				text: 'Source: jsonstub.com/etsfintech/symbols/'
			},

			loading: true,
			useHighStocks: true,

			xAxis: {
				type: 'datetime',
				title: {
					text:'Date'
				}
			},
			yAxis: {
				title: {
					text:'Price'
				}
			}
		};

		//tab/navbar functionality
		$scope.isActive = function (viewLocation) {
		 	viewLocation = '' + viewLocation;
		 	return viewLocation === $routeParams.id;
		};

		//get regions recursively
		$scope.getRegions=function (recursiveRegionDataNode, pattern, destination) {
			$scope.regions=utilService.getRecursiveNameData(recursiveRegionDataNode, pattern, destination);
		};

		//get risks recursively
		$scope.getRiskFamilies=function (recursiveRiskFamiliesDataNode, pattern, destination) {
			$scope.riskFamilies=utilService.getRecursiveNameData(recursiveRiskFamiliesDataNode, pattern, destination);
		};

		//get sectors recursively
		$scope.getSectors=function (recursiveSectorDataNode, pattern, destination) {
			$scope.sectors=utilService.getRecursiveNameData(recursiveSectorDataNode, pattern, destination);
		};

		//fill the graph with data
		$scope.fillGraph=function () {

			$scope.chartConfig.series.push({
				name: $scope.shareFile.id,
				color: $scope.shareFile.currency.color,
				id: 1,
				data: $scope.prices
			});

			$scope.chartConfig.yAxis={title:{text:'Price ' + $scope.shareFile.currency.symbol}};

			$scope.chartConfig.subtitle={text: 'Source: jsonstub.com/etsfintech/symbols/' +$scope.shareFile.id};

			$scope.chartConfig.loading=false;

		};

	    //Load the asset info
		$scope.loadAssetFile=function(id){


			dataService.getAssetFile(id).then(function(assetFileResult){

				$scope.shareFile=assetFileResult;
				//console.log($scope.shareFile);
				//console.log(JSON.stringify($scope.shareFile, null, 4));

				//Check that the response is not empty
				if($scope.shareFile && $scope.shareFile.id){
					//set regions
					$scope.getRegions($scope.shareFile.region, apiConstants.API_DATA_PATTERN_REGION, $scope.regions);
					//console.log($scope.regions);

					//set risk families
					$scope.getRiskFamilies($scope.shareFile.risk_family, apiConstants.API_DATA_PATTERN_RISK_FAMILY, $scope.riskFamilies);
					//console.log($scope.riskFamilies);

					//set sectors
					$scope.getSectors($scope.shareFile.sector, apiConstants.API_DATA_PATTERN_SECTOR, $scope.sectors);
					//console.log($scope.sectors);

					$scope.prices=utilService.mapObjectToArray($scope.shareFile.prices);
					//console.log($scope.shareFile.prices);
					//console.log($scope.prices);

					//fill the graph
					$scope.fillGraph();
				}
				else{
					traceService.catcher(apiConstants.EMPTY_DATA_API_MSG)(200);
			    	$window.alert(apiConstants.EMPTY_DATA_API_MSG);
				}
					
			}).catch(function(reason){
			    //if exceptions call the traceService catcher with a message and the exception object 
			    traceService.catcher(reason.msg)(reason.status);
			    $window.alert(reason.msg);	

			});

		};


		//keep sync the local storage
		$scope.storageLocal=function (id) {
			//get local storage
	 		var commentsInStore = localStorageService.get(id);
	 		//comments is the parsed content of the localstore of an empty array
	 		$scope.comments = JSON.parse(commentsInStore) || [];

	 		/*use the angular $watch listener to watch for changes in the value of $scope.comments. 
		 	If someone adds, edit or removes a comment, it will then keep our local storage comments datastore in sync.
		 	Note the watched value needed returned when using $scope and this*/
		 	$scope.$watch(
		 		function () {
			        return $scope.comments;
			    }, 
			    function () {
			    	//stringify the content to store in the local storage
		      		localStorageService.set($routeParams.id, JSON.stringify($scope.comments));
		    	},
		    	true
		    );

		 	$scope.addComment= function () {
		 		if($scope.commenttoadd){
		 			//get the now date as a string, using locale conventions
			 		var dts=utilService.newLocaleStringDate();
			 	
			 		var data={text:$scope.commenttoadd, date:dts};
			 		console.log(data);
			 		
			 		$scope.comments.push(data);
			 		$scope.commenttoadd='';
		 		}else{
		 			$window.alert(apiConstants.EMPTY_INPUT_MSG);	
		 		}
		 		
		 	};

		 	$scope.editComment = function (index, text) {
		 		if(text){
			 		//get the now date as a string, using locale conventions
			 		var dts=utilService.newLocaleStringDate(); 

			 		var data={text:text, date:dts};

			 		$scope.comments[index]= data;

			 		console.log(data);
		 		}else{
		 			$window.alert(apiConstants.EMPTY_INPUT_MSG);	
		 		}
		 	};

		 	$scope.removeComment = function (index) {
		 		$scope.comments.splice(index,1);
		 	};
	 	};


		//load the asset info
		$scope.loadAssetFile($routeParams.id);

		//In the meantime
		//fetch the info for the navbar from the shared service
		$scope.shares=sharingService.getAssets();

		//localStorage
		$scope.storageLocal($routeParams.id);
		
	}

})();