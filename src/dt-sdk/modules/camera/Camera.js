/**
 * @Author: Caven
 * @Date: 2021-10-23 14:48:15
 */

import { THREE } from '../namespace'

import CameraControls from 'camera-controls'

const DEF_OPTS = {
  fov: 60,
  aspect: 1.0,
  near: 0.1,
  far: 1000
}

class Camera {
  constructor(scene, options = {}) {
    this._options = {
      ...DEF_OPTS,
      ...options
    }
    this._delegate = new THREE.PerspectiveCamera(
      this._options.fov,
      this._options.aspect,
      this._options.near,
      this._options.far
    )
    CameraControls.install({ THREE: THREE })
    this._delegate.position.set(0, 0, 200)
    this._controller = new CameraControls(this._delegate, scene.canvas)
  }

  get delegate() {
    return this._delegate
  }

  update(frameState) {
    this._controller.update(frameState.time)
  }
}

export default Camera
