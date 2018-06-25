var app = angular.module('ctsApp', ["ngTable", "ngResource"]);
app.controller('ctsCtrl', function($scope, NgTableParams, $resource) {
	$scope.feed = $resource("https:localhost:8080//CST/errorTransaction");
	$scope.tableParams = new NgTableParams({}, {
	    getData: function(params) {
	        var queryParams = {
	            page:params.page() - 1, 
	            size:params.count()
	        };
	        var sortingProp = Object.keys(params.sorting());
	        if(sortingProp.length == 1){
	            queryParams["sort"] = sortingProp[0];
	            queryParams["sortDir"] = params.sorting()[sortingProp[0]];
	        }
	        return $scope.feed.query(queryParams, function(data, headers) {
	            var totalRecords = headers("PAGING_INFO").split(",")[0].split("=")[1];
	            params.total(totalRecords);
	            return data;
	        }).$promise;
	    }
	});
});