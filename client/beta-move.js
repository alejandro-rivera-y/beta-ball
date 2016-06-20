/**
 * @file
 * @author Alejandro Rivera <seeealejandro@gmail.com>
 * {@link https://github.com/alejandro-rivera-y/beta-ball GitHub}
 */


class BetaMove {

  constructor(handleOrientation) {
    this.ASC = 1
    this.DESC = 1
    this.direction = this.ASC
    this.READY_ON_TOP = false
    this.READY_ON_BOTTOM = true
    this.END_MOVE = 90 // De un angulo de 90 grados ha alcanzado el maximo
    this.BEGIN_MOVE = 0
  }

  init(handleOrientation) {
    this.point = new Event('point')
    window.addEventListener('deviceorientation', handleOrientation.bind(this))
  }

}