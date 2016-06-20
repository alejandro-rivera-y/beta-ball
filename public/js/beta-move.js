'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

var BetaMove = function () {
  function BetaMove(handleOrientation) {
    _classCallCheck(this, BetaMove);

    this.ASC = 1;
    this.DESC = 1;
    this.direction = this.ASC;
    this.READY_ON_TOP = false;
    this.READY_ON_BOTTOM = true;
    this.END_MOVE = 90; // De un angulo de 90 grados ha alcanzado el maximo
    this.BEGIN_MOVE = 0;
  }

  _createClass(BetaMove, [{
    key: 'init',
    value: function init(handleOrientation) {
      this.point = new Event('point');
      window.addEventListener('deviceorientation', handleOrientation.bind(this));
    }
  }]);

  return BetaMove;
}();

//# sourceMappingURL=beta-move.js.map