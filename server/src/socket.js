/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

"use strict";

import http from 'http'
import application from './http-request'
import socket from 'socket.io'
import userAgent from 'express-useragent'
import desktop from './desktop'
import mobile from './mobile'
let server = http.Server(application);
let io = socket(server);

io.on('connection', socket => {

  // Detectando el tipo de usuario conectado
  let clientDevice = userAgent.parse(socket.client.request.headers['user-agent']);

  if (clientDevice.isDesktop) {
    mobile.flushData();
    desktop.sendingUrl(socket, process.env.HOST);
  }

  // El usuario que ingreso a una nueva sala, emite un evento que se encarga de notificar al navegador
  // enviando el id asignado por socket.io
  socket.on('join', () => desktop.joined(io, socket));

  // Cada vez que un usuario configura los valores de su sesion se informa al navegador
  socket.on('newOptions', (betaBall) => mobile.newUserOptions(io, socket, betaBall));

  // Cuando el usuario esta listo emite un evento, donde se verifica si todos los usuarios estan listo
  // si todos los usuarios estan listos se emite un evento que renderiza el canvas, de lo contrario
  // se le indica al jugador que todos deben estar listo
  socket.on('user ready', ready => mobile.usersReady(io, socket));

  // Cuando el usuario mueve adecuadamente el dispositivo, este evento se le notifica al navegador para que
  // genere el efecto visual
  socket.on('user move', user => desktop.userMoved(io, socket));

  socket.on('winner', winner => {
    io.emit('screen winner', mobile.users[winner])
    mobile.flushData()
  });

  // Se limpia toda la información del servidor
  socket.on('restart', () => {
    mobile.flushData()
  });

  // En caso de que un error suceda se controla el evento, que debe ser mostrado en el desktop
  socket.on('error', err => {
    console.log(err);
    //socket.emit('display error')
  });

  // Cuando se desconecta un usuario se eliminan los datos asociados
  socket.on('disconnect', () => {
    io.emit('user left', socket.client.id);
    delete mobile.users[socket.client.id]
  });

});

module.exports = server;