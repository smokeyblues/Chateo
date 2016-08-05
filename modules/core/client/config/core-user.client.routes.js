'use strict';

// Setting up route
angular.module('core.user.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('user', {
        abstract: true,
        url: '/user',
        template: '<ui-view/>',
        data: {
          roles: ['user']
        }
      });
  }
]);
