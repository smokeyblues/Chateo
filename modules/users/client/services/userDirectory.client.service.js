'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('User', ['$resource',
  function ($resource) {
    return $resource('api/userDirectory', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.user').factory('User', ['$resource',
  function ($resource) {
    return $resource('api/userDirectory/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
