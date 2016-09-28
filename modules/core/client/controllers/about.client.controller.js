(function() {
  'use strict';

  angular
    .module('core')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];

  function AboutController($scope) {
    var vm = this;

    vm.pageHeader = {
      title: 'About Chateo'
    };
    vm.main = {
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }

    init();

    function init() {
    }
  }
})();
