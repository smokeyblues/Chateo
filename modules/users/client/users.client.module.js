'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users', ['core']);
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);

ApplicationConfiguration.registerModule('users.user', ['core']);
ApplicationConfiguration.registerModule('users.user', ['core.user']);
ApplicationConfiguration.registerModule('users.user.routes', ['core.user.routes']);
