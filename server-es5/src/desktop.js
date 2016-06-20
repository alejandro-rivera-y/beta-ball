'use strict';

var _tinyurl = require('tinyurl');

var _tinyurl2 = _interopRequireDefault(_tinyurl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var desktop = {

  // Id del navegador
  id: '',

  /**
   * En caso de que sea navegador se emite un evento que genera una url xx.xx.xxx/sesion/:id
   * minificada por tinyurl, donde el movil que se conecte se va a unir a la sala
   * que el navegador ha creado por defecto
   * @param socket {Object}
   * @param host {String}
   * @returns {String}
   */
  sendingUrl: function sendingUrl(socket, host) {
    _tinyurl2.default.shorten(host + '/session/' + socket.client.id, function (miniUrl) {
      socket.emit('identification', { url: miniUrl });
    });
    return desktop.id = socket.client.id;
  },


  /**
   * Cada vez que el usuario se une se genera el evento que se emite a todos los usuarios
   * @param io
   * @param socket
   */
  joined: function joined(io, socket) {
    io.emit('joined', { id: socket.client.id });
  },


  /**
   * Cuando el usuario se mueve se genera el evento que entiende el navegador como movimiento
   * @param io
   * @param socket
   */
  userMoved: function userMoved(io, socket) {
    io.emit('moved', socket.client.id);
  }
}; /**
    * @file Encargado de
    * @author Alejandro Rivera <seeealejandro@gmail.com>
    * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
    */

module.exports = desktop;
//# sourceMappingURL=desktop.js.map