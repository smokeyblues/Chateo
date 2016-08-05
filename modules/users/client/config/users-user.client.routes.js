'use strict';

// Setting up route
angular.module('users.user.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('user.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/user/user-directory.client.view.html',
        controller: 'UserDirectoryController'
      });
  }
]);
