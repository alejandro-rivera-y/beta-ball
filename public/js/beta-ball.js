"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

var BetaBall = function () {
  function BetaBall(_ref) {
    var id = _ref.id;

    _classCallCheck(this, BetaBall);

    this.id = id;
  }

  _createClass(BetaBall, [{
    key: "basicOptions",
    value: function basicOptions(nombre, color) {
      this.nombre = nombre;
      this.color = color;
      this.weight = this.normal = 1;
    }
  }, {
    key: "move",
    value: function move(_ref2) {
      var friction = _ref2.friction;
      var gravity = _ref2.gravity;

      this.aceleration = this.strength - friction * (this.normal * gravity) / this.weight;
      this.aceleration = this.aceleration >= 0 ? this.aceleration : 0;
      this.X += this.aceleration;
      this.strength = this.strength >= 0 ? this.strength - friction : 0;
    }
  }]);

  return BetaBall;
}();

//# sourceMappingURL=beta-ball.js.map