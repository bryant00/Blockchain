(function(angular) {
  'use strict';
angular.module('httpExample', [])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    // We must whitelist the JSONP endpoint that we are using to show that we trust it
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*'
    ]);
  }])
  .controller('FetchController', ['$scope', '$http', '$templateCache',
    function($scope, $http, $templateCache) {
      $scope.method = 'GET';
      $scope.url = 'http://127.0.0.1:5000/chain';

      $scope.fetch = function() {
        $scope.code = null;
        $scope.response = null;

        $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
          then(function(response) {
            $scope.status = response.status;
            $scope.data = response.data;
          }, function(response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
      };

      $scope.updateModel = function(method, url) {
        $scope.method = method;
        $scope.url = url;
      };
    }]);
})(window.angular);

/*
Copyright 2020 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/