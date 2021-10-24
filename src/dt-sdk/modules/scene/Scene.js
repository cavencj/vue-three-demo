/**
 * @Author: Caven
 * @Date: 2021-10-23 14:31:33
 */

import { THREE } from '@dt-modules/namespace'
import Camera from '@dt-modules/camera/Camera'
import { MaterialCache } from '@dt-modules/material'

class Scene {
  constructor(container, options = {}) {
    this._delegate = new THREE.Scene()
    this._renderer = new THREE.WebGLRenderer(options)
    this._clock = new THREE.Clock()
    this._camera = new Camera(this, {
      ...options,
      aspect: container.clientWidth / container.clientHeight
    })
    this._renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this._renderer.domElement)
    this._renderer.render(this._delegate, this._camera.delegate)
    this._frameState = {
      frameNumber: 1,
      resolution: new THREE.Vector2(
        container.clientWidth,
        container.clientHeight
      ),
      time: this._clock.getDelta(),
      context: this._renderer.getContext()
    }
  }

  get delegate() {
    return this._delegate
  }

  get canvas() {
    return this._renderer.domElement
  }

  get renderer() {
    return this._renderer
  }

  get frameState() {
    return this._frameState
  }

  _updateFrameState() {
    ++this._frameState.frameNumber
    if (this._frameState.frameNumber > 150000) {
      this._frameState.frameNumber = 1
    }
    this._frameState.time = this._clock.getDelta()
  }

  render() {
    this._updateFrameState()
    this._camera.update(this._frameState)
    MaterialCache.update(this._frameState)
    this._renderer.render(this._delegate, this._camera.delegate)
    requestAnimationFrame(this.render.bind(this))
  }
}

export default Scene
