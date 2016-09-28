(function() {
  'use strict';

  angular
    .module('core')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$scope'];

  function ContactController($scope) {
    var vm = this;

    // Contact controller logic
    // ...

    init();

    function init() {
    }
  }
})();
