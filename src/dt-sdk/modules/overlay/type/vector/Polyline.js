/**
 * @Author: Caven
 * @Date: 2021-10-23 17:36:36
 */

import { THREE } from '@dt-modules/namespace'
import State from '@dt-modules/state/State'
import Parse from '@dt-modules/parse/Parse'
import Overlay from '../../Overlay'

class Polyline extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new THREE.Line()
    this._geometry = new THREE.BufferGeometry()
    this._material = new THREE.LineBasicMaterial()
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('polyline')
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    let arrPositions = Parse.parsePointsToArray(this._positions)
    let arrIndex = this._positions.map((item, index) => index)
    this._geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(arrPositions, 3)
    )
    this._geometry.setAttribute(
      'index',
      new THREE.Float32BufferAttribute(arrIndex, 1)
    )
    return this
  }

  get positions() {
    return this._positions
  }

  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this.positions = this._positions
    this._delegate.geometry = this._geometry
    this.material = this._material
  }
}

Overlay.registerType('polyline')

export default Polyline
