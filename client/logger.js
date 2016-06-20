/**
 * Created by alejandro on 16/06/16.
 */


function Logger(message) {
  this.message = message
}

Logger.prototype = {
  _render: function () {
    var container = document.querySelector('#logger')
    if (!container) {
      var body = document.querySelector('body')
      container = document.createElement('div')
      container.id = 'logger'
      body.appendChild(container)
      container = document.querySelector('#logger')
    }
  }
}