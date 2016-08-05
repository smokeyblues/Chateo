'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.user', ['core']);
ApplicationConfiguration.registerModule('core.user.routes', ['ui.router']);
