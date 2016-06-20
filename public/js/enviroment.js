/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HALF = 0.5;
var TEN_PERCENT = 0.1;
var ZERO_PI = 0 * Math.PI;
var TWO_PI = 2 * Math.PI;

var Enviroment = function () {
  function Enviroment(_ref) {
    var canvas = _ref.canvas;
    var _ref$gravity = _ref.gravity;
    var gravity = _ref$gravity === undefined ? 9.8 : _ref$gravity;
    var _ref$friction = _ref.friction;
    var friction = _ref$friction === undefined ? 0.3 : _ref$friction;
    var _ref$borderSize = _ref.borderSize;
    var borderSize = _ref$borderSize === undefined ? .3 : _ref$borderSize;
    var _ref$backgroundColor = _ref.backgroundColor;
    var backgroundColor = _ref$backgroundColor === undefined ? '#080300' : _ref$backgroundColor;
    var _ref$borderColor = _ref.borderColor;
    var borderColor = _ref$borderColor === undefined ? '#005453' : _ref$borderColor;

    var _ref$betaBalls = _toArray(_ref.betaBalls);

    _classCallCheck(this, Enviroment);

    if (!canvas) {
      throw new Error('Debe especificarce un objeto canvas');
    }
    this.canvas = canvas;
    this.gravity = gravity;
    this.friction = friction;
    this.borderSize = borderSize;
    this.backgrounColor = backgroundColor;
    this.borderColor = borderColor;
    this.betaBalls = betaBalls;
    this.resizing();
    this.init = false;
    this._toCartesianPlane();
  }

  _createClass(Enviroment, [{
    key: 'draw',
    value: function draw(winnerFunction) {
      if (!this.init) {
        for (var index in this.betaBalls) {
          if (this.betaBalls.hasOwnProperty(index)) {
            this.betaBalls[index].X = this.width * 0.1;
            this.betaBalls[index].Y = this.height * 0.1;
            this.betaBalls[index].radius = this.width * 0.05;
            this.betaBalls[index].weight = this.betaBalls[index].normal = 1;
          }
        }
        this.winnerFunction = winnerFunction;
        this.init = true;
      }
      this.context.fillStyle = this.backgrounColor;
      this.context.fillRect(0, 0, this.width, this.height);

      for (var k = 0; k < this.width; k += this.width * TEN_PERCENT) {
        this.context.fillStyle = this.borderColor;
        this.context.fillRect(k, 0, this.borderSize, this.height);
      }

      for (var _k = 0; _k < this.height; _k += this.height * TEN_PERCENT) {
        this.context.fillStyle = this.borderColor;
        this.context.fillRect(0, _k, this.width, this.borderSize);
      }

      for (var indexDos in this.betaBalls) {
        if (this.betaBalls.hasOwnProperty(indexDos)) {
          this.context.beginPath();
          this.context.arc(this.betaBalls[indexDos].X, this.betaBalls[indexDos].Y, this.betaBalls[indexDos].radius, ZERO_PI, TWO_PI);
          this.context.fillStyle = this.betaBalls[indexDos].color;
          this.context.fill();
          this.context.strokeStyle = this.betaBalls[indexDos].color;
          this.context.stroke();
          this.betaBalls[indexDos].move({ friction: this.friction, gravity: this.gravity });
          if (this.betaBalls[indexDos].X > this.width) {
            window.cancelAnimationFrame(this.animation);
            this.winner = indexDos;
            this.winnerFunction(this.winner);
          }
        }
      }
      if (!this.winner) {
        this.animation = window.requestAnimationFrame(this.draw.bind(this));
      }
    }
  }, {
    key: 'resizing',
    value: function resizing() {
      this.height = window.innerHeight * .95;
      this.width = window.innerWidth * .95;
      this.floor = this.height * TEN_PERCENT;
      this.canvas.height = this.height;
      this.canvas.width = this.width;
      this.context = this.canvas.getContext('2d');
    }
  }, {
    key: '_toCartesianPlane',
    value: function _toCartesianPlane() {
      this.context.translate(0, this.height);
      this.context.scale(1, -1);
    }
  }]);

  return Enviroment;
}();

//# sourceMappingURL=enviroment.js.map