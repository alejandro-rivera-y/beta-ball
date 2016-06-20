'use strict';

/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

var mobile = {

  // Objeto que contiene los usuarios
  users: {},

  /**
   * Cuando se agrega un nuevo usuario se genera el evento que hace que el usuario agrege sus caracteristicas
   * @param io
   * @param socket
   * @param betaBall
   */
  newUserOptions: function newUserOptions(io, socket, betaBall) {
    mobile.users[socket.client.id] = {
      id: socket.client.id,
      name: betaBall.name,
      color: betaBall.color
    };
    io.emit('basicOptions', mobile.users[socket.client.id]);
  },


  /**
   * Cuando el usuaio esta listo se notifica en caso de que haga falta algun usuario o se comienza la partida
   * @param io
   * @param socket
   */
  usersReady: function usersReady(io, socket) {
    mobile.users[socket.client.id].ready = true;
    if (mobile.couldBeReady()) {
      io.emit('start', mobile.users);
    } else {
      var data = {
        id: socket.client.id,
        message: 'Esperando por los otros usuarios',
        type: 'success'
      };
      socket.emit('notification', data);
    }
  },


  /**
   * Determina si todos los usuarios asignados estan listos para jugar
   * @returns {boolean}
   */
  couldBeReady: function couldBeReady() {
    var ready = true;
    for (var user in mobile.users) {
      if (mobile.users.hasOwnProperty(user)) {
        if (!mobile.users[user].ready) {
          ready = false;
          break;
        }
      }
    }
    return ready && Object.keys(mobile.users).length > 1;
  },


  /**
   * Elimina los valores de los usuarios
   */
  flushData: function flushData() {
    mobile.users = {};
  }
};

module.exports = mobile;
//# sourceMappingURL=mobile.js.map