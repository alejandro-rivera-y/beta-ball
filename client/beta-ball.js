/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */

class BetaBall {

  constructor({id}) {
    this.id = id
  }

  basicOptions(nombre, color) {
    this.nombre = nombre
    this.color = color
    this.weight = this.normal = 1
  }

  move({friction, gravity}) {
    this.aceleration = (this.strength - (friction * (this.normal * gravity)) / this.weight)
    this.aceleration = this.aceleration >= 0 ? this.aceleration : 0
    this.X += this.aceleration
    this.strength = this.strength >= 0 ? this.strength - friction : 0;
  }

}