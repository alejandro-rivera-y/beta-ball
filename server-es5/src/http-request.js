/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

"use strict";

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var application = (0, _express2.default)();

application.use(_express2.default.static('public'));
application.engine('handlebars', (0, _expressHandlebars2.default)());
application.set('view engine', 'handlebars');

application.get('/', function (req, res) {
  res.render('index');
});

application.param('id', function (request, response, next, session) {
  request.sessionSocket = session;
  next();
});

application.get('/session/:id', function (request, response, next) {
  response.render('index', { sessionSocket: request.sessionSocket });
});

module.exports = application;
//# sourceMappingURL=http-request.js.map