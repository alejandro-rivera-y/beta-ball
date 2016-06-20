/**
 * @file Archivo encargado de levantar el servidor e incluir las librerias a usar
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

"use strict";

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressUseragent = require('express-useragent');

var _expressUseragent2 = _interopRequireDefault(_expressUseragent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var PORT = process.env.ENV || 3000;

var application = (0, _express2.default)();
var server = _http2.default.Server(application);
var io = (0, _socket2.default)(server);

var browsers = [];
var count = 0;

application.use(_express2.default.static('public'));

io.on('connection', function (socket) {

  var clientDivice = _expressUseragent2.default.parse(socket.client.request.headers['user-agent']);

  if (clientDivice.isDesktop) {
    browsers.push({ id: socket.client.id, device: clientDivice });
  } else if (clientDivice.isMobile) {
    browsers.push({ id: socket.client.id, device: clientDivice });
  }

  socket.on('disconnect', function () {

    for (var index in users) {
      var disconnectedUser = socket.client.id === users[index].id;
      if (disconnectedUser) {
        users.splice(index, 1);
      }
    }
  });

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    _expressUseragent2.default.parse(socket.request.headers['user-agent']);
  });
});

application.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public/index.handlebars'));
});

server.listen(PORT, function () {
  console.log('Escuchando en ' + PORT);
});
'use strict';

/**
 * Created by alejandro on 16/06/16.
 */

var socket = io();
var formulario = document.querySelector('#mensajesForm');
var mensaje = document.querySelector('#mensaje');
var contenido = document.querySelector('#contenido');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  socket.emit('chat message', mensaje.value);
});
socket.on('chat message', function (msg) {
  contenido.innerHTML += '<li>' + msg + '</li>';
});

//# sourceMappingURL=front-app-compiled.js.map

//# sourceMappingURL=front-app-compiled.js.map