/**
 * @Author: Caven
 * @Date: 2021-10-23 17:36:36
 */

import { THREE } from '@dt-modules/namespace'
import State from '@dt-modules/state/State'
import Parse from '@dt-modules/parse/Parse'
import DTMath from '@dt-modules/math/Math'
import Overlay from '../../Overlay'

class Circle extends Overlay {
  constructor(position, radius) {
    super()
    this._position = Parse.parsePosition(position)
    this._radius = radius
    this._delegate = new THREE.Mesh()
    this._geometry = undefined
    this._material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('circle')
  }

  set position(position) {
    this._position = Parse.parsePosition(position)
    this._geometry = new THREE.ShapeGeometry(this._computeCircleShape())
    this._delegate.position.set(
      this._position.x,
      this._position.y,
      this._position.z
    )
    this._delegate.rotation.set(
      DTMath.toRadians(this._position.heading),
      DTMath.toRadians(this._position.pitch),
      DTMath.toRadians(this._position.roll)
    )
    return this
  }

  get position() {
    return this._position
  }

  set radius(radius) {
    this._radius = +radius
    this._geometry = new THREE.ShapeGeometry(this._computeCircleShape())
    return this
  }

  get radius() {
    return this._radius
  }

  /**
   *
   * @returns {*}
   * @private
   */
  _computeCircleShape() {
    let shape = new THREE.Shape()
    shape.absarc(0, 0, this._radius, 0, Math.PI * 2)
    return shape
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this.position = this._position
    this._delegate.geometry = this._geometry
    this.material = this._material
  }
}

Overlay.registerType('circle')

export default Circle
