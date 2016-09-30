(function() {
  'use strict';

  angular
    .module('core')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];

  function AboutController($scope) {
    var vm = this;

    // About controller logic
    // ...

    init();

    function init() {
    }
  }
})();
