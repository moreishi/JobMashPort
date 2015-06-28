'use strict';

angular.module('myApp.home', ['ngRoute','ngSanitize'])
.factory('SearchSrvc', ['$http',function($http) {
  
  var result = [];

  return {
    init: function(cb) {
      $http({
        url: '/api/search',
        method: 'GET',
        params: { q: 'hiring' }
      }).success(function(a) {
        result = a;
        cb(result);
      });
    },
    search: function(q,cb) {
      $http({
        url: '/api/search',
        method: 'GET',
        params: { q: q }
      }).success(function(a) {
        result = a;
        cb(result);
      });
    },
    getJobs: function(cb) {
      cb(result);
    }
  }
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl',
    resolve: {
      get: ['$q','SearchSrvc', function($q,SearchSrvc) {
        var defer = $q.defer();
        SearchSrvc.init(function(a) {
          console.log(a);
          defer.resolve(a);
        });
        return defer.promise;
      }]
    }
  });
}])

.controller('HomeCtrl', ['$scope','SearchSrvc',function($scope,SearchSrvc) {

  SearchSrvc.getJobs(function(a) {
    $scope.jobs = a.statuses;
  });

  $scope.search = function() {

    SearchSrvc.search($scope.f.search, function(a) {
      $scope.jobs = a.statuses;
    });
  }

}]);