'use strict';

/**
 * Created by alejandro on 16/06/16.
 */

function Logger(message) {
  this.message = message;
}

Logger.prototype = {
  _render: function _render() {
    var container = document.querySelector('#logger');
    if (!container) {
      var body = document.querySelector('body');
      container = document.createElement('div');
      container.id = 'logger';
      body.appendChild(container);
      container = document.querySelector('#logger');
    }
  }
};

//# sourceMappingURL=logger.js.map