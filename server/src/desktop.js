/**
 * @file Encargado de
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

import tinyURL from 'tinyurl'

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
  sendingUrl(socket, host){
    tinyURL.shorten(`${host}/session/${socket.client.id}`, function (miniUrl) {
      socket.emit('identification', {url: miniUrl})
    });
    return desktop.id = socket.client.id;
  },

  /**
   * Cada vez que el usuario se une se genera el evento que se emite a todos los usuarios
   * @param io
   * @param socket
   */
  joined(io, socket){
    io.emit('joined', {id: socket.client.id})
  },

  /**
   * Cuando el usuario se mueve se genera el evento que entiende el navegador como movimiento
   * @param io
   * @param socket
   */
  userMoved(io, socket){
    io.emit('moved', socket.client.id);
  }

};

module.exports = desktop;