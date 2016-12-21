'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'Socket', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, Socket, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // Start a socketio room here, make sure you destroy it when they signout

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // console.log(Socket);
        // console.log($scope.authentication.user._id + ' has signed in and should join room' + $scope.authentication.user._id + ' now.');

        //setting online property to true
        // $scope.authentication.user.online[0] = true;
        console.log($scope.authentication.user.displayName + ' online status is set to ' + $scope.authentication.user.online);

        // start a socketio room here, make sure you destroy it when they signout
        Socket.connect();
        Socket.emit('signedIn', 'room' + $scope.authentication.user.firstName + $scope.authentication.user.lastName);
        // console.log(server.io);


        // And redirect to the previous or home page

        // console.log('io object: ' + io);

        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
