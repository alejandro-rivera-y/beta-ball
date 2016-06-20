/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

"use strict";

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _httpRequest = require('./http-request');

var _httpRequest2 = _interopRequireDefault(_httpRequest);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _expressUseragent = require('express-useragent');

var _expressUseragent2 = _interopRequireDefault(_expressUseragent);

var _desktop = require('./desktop');

var _desktop2 = _interopRequireDefault(_desktop);

var _mobile = require('./mobile');

var _mobile2 = _interopRequireDefault(_mobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.Server(_httpRequest2.default);
var io = (0, _socket2.default)(server);

io.on('connection', function (socket) {

  // Detectando el tipo de usuario conectado
  var clientDevice = _expressUseragent2.default.parse(socket.client.request.headers['user-agent']);

  if (clientDevice.isDesktop) {
    _mobile2.default.flushData();
    _desktop2.default.sendingUrl(socket, process.env.HOST);
  }

  // El usuario que ingreso a una nueva sala, emite un evento que se encarga de notificar al navegador
  // enviando el id asignado por socket.io
  socket.on('join', function () {
    return _desktop2.default.joined(io, socket);
  });

  // Cada vez que un usuario configura los valores de su sesion se informa al navegador
  socket.on('newOptions', function (betaBall) {
    return _mobile2.default.newUserOptions(io, socket, betaBall);
  });

  // Cuando el usuario esta listo emite un evento, donde se verifica si todos los usuarios estan listo
  // si todos los usuarios estan listos se emite un evento que renderiza el canvas, de lo contrario
  // se le indica al jugador que todos deben estar listo
  socket.on('user ready', function (ready) {
    return _mobile2.default.usersReady(io, socket);
  });

  // Cuando el usuario mueve adecuadamente el dispositivo, este evento se le notifica al navegador para que
  // genere el efecto visual
  socket.on('user move', function (user) {
    return _desktop2.default.userMoved(io, socket);
  });

  socket.on('winner', function (winner) {
    io.emit('screen winner', _mobile2.default.users[winner]);
    _mobile2.default.flushData();
  });

  // Se limpia toda la información del servidor
  socket.on('restart', function () {
    _mobile2.default.flushData();
  });

  // En caso de que un error suceda se controla el evento, que debe ser mostrado en el desktop
  socket.on('error', function (err) {
    console.log(err);
    //socket.emit('display error')
  });

  // Cuando se desconecta un usuario se eliminan los datos asociados
  socket.on('disconnect', function () {
    io.emit('user left', socket.client.id);
    delete _mobile2.default.users[socket.client.id];
  });
});

module.exports = server;
//# sourceMappingURL=socket.js.map