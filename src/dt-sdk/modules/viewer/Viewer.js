/**
 * @Author: Caven
 * @Date: 2021-10-23 14:14:24
 */

import Scene from '@dt-modules/scene/Scene'
import { LayerEventType } from '@dt-modules/event'

class Viewer {
  constructor(container, options = {}) {
    if (!container) {
      throw new Error('container is empty')
    }
    if (typeof container === 'string') {
      this._container = document.getElementById(container)
    } else {
      this._container = container
    }
    this._scene = new Scene(this._container, options)
    this._layerCache = {}
    this._scene.render()
  }

  get container() {
    return this._container
  }

  get scene() {
    return this._scene
  }

  get canvas() {
    return this._scene.canvas
  }

  addLayer(layer) {
    !this._layerCache[layer.type] && (this._layerCache[layer.type] = {})
    if (!Object(this._layerCache[layer.type]).hasOwnProperty(layer.id)) {
      layer.layerEvent.fire(LayerEventType.ADD, this)
      this._layerCache[layer.type][layer.id] = layer
    }
    return this
  }

  /**
   *
   * @param layer
   * @returns {Viewer}
   */
  removeLayer(layer) {
    if (Object(this._layerCache[layer.type]).hasOwnProperty(layer.id)) {
      layer.fire(LayerEventType.REMOVE, this)
      delete this._layerCache[layer.type][layer.id]
    }
    return this
  }

  /**
   *
   * @param id
   * @returns {*|undefined}
   */
  getLayer(id) {
    let filters = this.getLayers().filter(item => item.id === id)
    return filters && filters.length ? filters[0] : undefined
  }

  /**
   *
   * @returns {*[]}
   */
  getLayers() {
    let result = []
    Object.keys(this._layerCache).forEach(type => {
      let cache = this._layerCache[type]
      Object.keys(cache).forEach(layerId => {
        result.push(cache[layerId])
      })
    })
    return result
  }

  /**
   *
   * @param fn
   * @param context
   * @returns {Viewer}
   */
  eachLayer(fn, context) {
    Object.keys(this._layerCache).forEach(type => {
      let cache = this._layerCache[type]
      Object.keys(cache).forEach(layerId => {
        fn.call(context, cache[layerId])
      })
    })
    return this
  }
}

export default Viewer
