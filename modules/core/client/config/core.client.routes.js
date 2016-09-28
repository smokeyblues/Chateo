'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
      .state('contact', {
        url: '/contact',
        templateUrl: 'modules/core/client/views/contact.client.view.html',
        controller: 'ContactController',
        controllerAs: 'vm'
      })
      .state('googleaab1744130d17c66', {
        url: '/googleaab1744130d17c66',
        templateUrl: 'modules/core/client/views/googleaab1744130d17c66.client.view.html',
        controller: 'Googleaab1744130d17c66Controller',
        controllerAs: 'vm'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'modules/core/client/views/about.client.view.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      })
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
