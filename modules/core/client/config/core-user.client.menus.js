'use strict';

angular.module('core.user').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'user',
      state: 'user',
      type: 'dropdown',
      roles: ['user']
    });
  }
]);
