'use strict';

var _socket = require('./src/socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

var env = require('../config/' + (process.env.ENV || 'develop') + '.json');
process.env.PORT = env.port;
process.env.HOST = env.host;

var PORT = process.env.PORT || 3000;

_socket2.default.listen(PORT, function () {
  console.log('Listen on ' + PORT);
});
//# sourceMappingURL=index.js.map