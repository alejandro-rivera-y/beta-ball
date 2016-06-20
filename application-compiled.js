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

var _expressUseragent = require('express-useragent');

var _expressUseragent2 = _interopRequireDefault(_expressUseragent);

var _tinyurl = require('tinyurl');

var _tinyurl2 = _interopRequireDefault(_tinyurl);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.ENV || 3000;

var application = (0, _express2.default)();
var server = _http2.default.Server(application);
var io = (0, _socket2.default)(server);
var desktop = {};
var users = {};

application.use(_express2.default.static('public'));
application.engine('handlebars', (0, _expressHandlebars2.default)());
application.set('view engine', 'handlebars');

io.on('connection', function (socket) {

  var clientDevice = _expressUseragent2.default.parse(socket.client.request.headers['user-agent']);

  if (clientDevice.isDesktop) {
    desktop = socket.client.id;
    flushData();
    _tinyurl2.default.shorten('http://192.168.0.3:3000/session/' + socket.client.id, function (miniUrl) {
      socket.emit('identification', { url: miniUrl });
    });
  }

  socket.on('join', function (room) {
    io.emit('joined', { id: socket.client.id });
  });

  socket.on('newOptions', function (betaBall) {
    users[socket.client.id] = {
      id: socket.client.id,
      name: betaBall.name,
      color: betaBall.color
    };
    io.emit('basicOptions', users[socket.client.id]);
  });

  socket.on('user ready', function (ready) {
    users[socket.client.id].ready = ready;
    if (couldBeReady()) {
      io.emit('start', users);
    } else {
      var data = {
        id: socket.client.id,
        message: 'Debe existir mas de un jugador en la partida',
        type: 'danger'
      };
      socket.emit('notification', data);
    }
  });

  socket.on('user move', function (user) {
    io.emit('moved', socket.client.id);
    if (users[socket.client.id].finished) {
      socket.emit('finished', user);
    }
  });

  socket.on('winner', function (winner) {
    io.emit('screen winner', users[winner]);
  });

  socket.on('restart', function () {
    flushData();
  });

  socket.on('error', function (err) {
    // TODO Logging todos los errores
    console.log(err);
    socket.emit('display error', function () {});
  });

  socket.on('disconnect', function () {
    io.emit('user left', socket.client.id);
    delete users[socket.client.id];
  });

  function couldBeReady() {
    var ready = true;
    for (var user in users) {
      if (users.hasOwnProperty(user)) {
        if (!users[user].ready) {
          ready = false;
          break;
        }
      }
    }
    return ready && Object.keys(users).length > 1;
  }

  function flushData() {
    users = {};
  }
});

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

application.get('/motion', function (request, response, next) {
  response.render('motion');
});

server.listen(PORT, function () {
  console.log('Escuchando en ' + PORT);
});

//# sourceMappingURL=application-compiled.js.map