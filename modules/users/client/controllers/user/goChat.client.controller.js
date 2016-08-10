'use strict';

angular.module('users.user').controller('goChatController', ['$scope', '$location', 'User',
  function ($scope, $location, User) {
    $scope.goChat = function () {
      $location.url('https://meet.jit.si/'+$scope.authentication.user.username+'calls'+$scope.user.username);
    };
  }
]);
