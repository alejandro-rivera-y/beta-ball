'use strict';

var _socket = require('./src/socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.ENV || 3000; /**
                                     * @file
                                     * @author Alejandro Rivera <seeealejandro@gmail.com>
                                     * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
                                     */

_socket2.default.listen(PORT, function () {
  console.log('Listen on ' + PORT);
});
//# sourceMappingURL=index.js.map