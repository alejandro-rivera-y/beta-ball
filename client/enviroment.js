/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

"use strict"

const HALF = 0.5
const TEN_PERCENT = 0.1
const ZERO_PI = 0 * Math.PI
const TWO_PI = 2 * Math.PI

class Enviroment {

  constructor({canvas, gravity = 9.8, friction = 0.3, borderSize = .3, backgroundColor = '#080300', borderColor = '#005453', betaBalls: []}) {
    if (!canvas) {
      throw new Error('Debe especificarce un objeto canvas')
    }
    this.canvas = canvas
    this.gravity = gravity
    this.friction = friction
    this.borderSize = borderSize
    this.backgrounColor = backgroundColor
    this.borderColor = borderColor
    this.betaBalls = betaBalls
    this.resizing()
    this.init = false
    this._toCartesianPlane()
  }

  draw(winnerFunction) {
    if (!this.init) {
      for (let index in this.betaBalls) {
        if (this.betaBalls.hasOwnProperty(index)) {
          this.betaBalls[index].X = this.width * 0.1
          this.betaBalls[index].Y = this.height * 0.1
          this.betaBalls[index].radius = this.width * 0.05
          this.betaBalls[index].weight = this.betaBalls[index].normal = 1
        }
      }
      this.winnerFunction = winnerFunction
      this.init = true
    }
    this.context.fillStyle = this.backgrounColor
    this.context.fillRect(0, 0, this.width, this.height)

    for (let k = 0; k < this.width; k += this.width * TEN_PERCENT) {
      this.context.fillStyle = this.borderColor
      this.context.fillRect(k, 0, this.borderSize, this.height)
    }

    for (let k = 0; k < this.height; k += this.height * TEN_PERCENT) {
      this.context.fillStyle = this.borderColor
      this.context.fillRect(0, k, this.width, this.borderSize)
    }

    for (let indexDos in this.betaBalls) {
      if (this.betaBalls.hasOwnProperty(indexDos)) {
        this.context.beginPath();
        this.context.arc(this.betaBalls[indexDos].X, this.betaBalls[indexDos].Y, this.betaBalls[indexDos].radius, ZERO_PI, TWO_PI);
        this.context.fillStyle = this.betaBalls[indexDos].color
        this.context.fill()
        this.context.strokeStyle = this.betaBalls[indexDos].color
        this.context.stroke()
        this.betaBalls[indexDos].move({friction: this.friction, gravity: this.gravity})
        if (this.betaBalls[indexDos].X > this.width) {
          window.cancelAnimationFrame(this.animation)
          this.winner = indexDos
          this.winnerFunction(this.winner)
        }
      }
    }
    if (!this.winner) {
      this.animation = window.requestAnimationFrame(this.draw.bind(this))
    }
  }

  resizing() {
    this.height = window.innerHeight * .95
    this.width = window.innerWidth * .95
    this.floor = this.height * TEN_PERCENT
    this.canvas.height = this.height
    this.canvas.width = this.width
    this.context = this.canvas.getContext('2d')
  }

  _toCartesianPlane() {
    this.context.translate(0, this.height)
    this.context.scale(1, -1)
  }

}