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

	app.controller('AssetfileCtrl', ['$scope', 'dataService', '$window', '$routeParams', 'apiConstants', 'traceService', 'utilService', '$location', 'sharingService', '$timeout', 'localStorageService', AssetfileCtrl]);

	function AssetfileCtrl($scope, dataService, $window, $routeParams, apiConstants, traceService, utilService, $location, sharingService, $timeout, localStorageService) {

		$scope.regions=[];
		$scope.riskFamilies=[];
		$scope.sectors=[];
		$scope.prices=[];
		$scope.location=$location.path();

		//tab functionality
		$scope.isActive = function (viewLocation) {
		 	//console.log($location.path());
		 	return viewLocation === $scope.location;
		};


		$scope.getRegions=function (recursiveRegionData, pattern, destination) {
			$scope.regions=utilService.getRecursiveNameData(recursiveRegionData, pattern, destination);
		};

		$scope.getRiskFamilies=function (recursiveRiskFamiliesData, pattern, destination) {
			$scope.riskFamilies=utilService.getRecursiveNameData(recursiveRiskFamiliesData, pattern, destination);
		};

		$scope.getSectors=function (recursiveSectorData, pattern, destination) {
			$scope.sectors=utilService.getRecursiveNameData(recursiveSectorData, pattern, destination);
		};

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
			        	type: 'datetime',
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
		};

	    //Load the assets
		$scope.loadAssetFile=function(id){


			dataService.getAssetFile(id).then(function(assetFileResult){

				$scope.shareFile=assetFileResult;
				//console.log($scope.shareFile);
				//console.log(JSON.stringify($scope.shareFile, null, 4));

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

				//draw the graph
				$scope.createGraph(id);
					

			}).catch(function(reason){

			    //if exceptions call the traceService catcher with a message and the exception object 
			    traceService.catcher(reason.error)(status);
			    $window.alert(reason.error);	

			});

		};


		//keep sync the local storage
		$scope.storageLocal=function (id) {
	 		var commentsInStore = localStorageService.get(id);
	 		$scope.comments = JSON.parse(commentsInStore) || [];

	 		/*use the angular $watch listener to watch for changes in the value of $scope.comments. 
		 	If someone adds, edit or removes a comment, it will then keep our local storage comments datastore in sync.
		 	Note the watched value needed returned when using $scope and this*/
		 	$scope.$watch(
		 		function () {
			        return $scope.comments;
			    }, 
			    function () {
		      		localStorageService.set($routeParams.id, JSON.stringify($scope.comments));
		    	},
		    	true
		    );

		 	$scope.addComment= function () {
		 		if($scope.commenttoadd){
		 			var dt=new Date();
			 		console.log(dt);
			 		var dts=dt.toLocaleString();;
			 		console.log(dts);

			 		var data={text:$scope.commenttoadd, date:dts};
			 		console.log(data);
			 		$scope.comments.push(data);
			 		$scope.commenttoadd='';
		 		}else{
		 			$window.alert("The comment can't be empty");	
		 		}
		 		
		 	};

		 	$scope.editComment = function (index, text) {
		 		if(text){
			 		var dt=new Date();
			 		console.log(dt);
			 		var dts=dt.toLocaleString();;
			 		console.log(dts);
			 		var data={text:text, date:dts};
			 		$scope.comments[index]= data;
		 		}else{
		 			$window.alert("The comment can't be empty");	
		 		}
		 	};

		 	$scope.removeComment = function (index) {
		 		$scope.comments.splice(index,1);
		 	};
	 	}


		//load the asset info
		$scope.loadAssetFile($routeParams.id);

		//In the meantime
		//fetch the info for the navbar
		$scope.shares=sharingService.getAssets();

		//localStorage
		$scope.storageLocal($routeParams.id);
		
	}

})();