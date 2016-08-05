'use strict';

/**
 * Module dependencies.
 */
var userPolicy = require('../policies/userDirectory.server.policy'),
  userDirectory = require('../controllers/userDirectory.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/userDirectory')
    .get(userPolicy.isAllowed, userDirectory.list);

  //Single user routes
  app.route('/api/userDirectory/:userId')
    .get(userPolicy.isAllowed, userDirectory.read);

  // Finish by binding the user middleware
  app.param('userId', userDirectory.userByID);
};
