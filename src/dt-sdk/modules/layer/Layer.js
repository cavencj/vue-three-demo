/**
 * @Author: Caven
 * @Date: 2021-10-23 15:56:21
 */

import { LayerEventType, LayerEvent, OverlayEventType } from '@dt-modules/event'
import State from '@dt-modules/state/State'
import LayerType from './LayerType'

class Layer {
  constructor(id) {
    this._id = id
    this._show = true
    this._cache = {}
    this._state = undefined
    this._viewer = undefined
    this._layerEvent = new LayerEvent()
    this._layerEvent.on(LayerEventType.ADD, this._onAdd, this)
    this._layerEvent.on(LayerEventType.REMOVE, this._onRemove, this)
  }

  get id() {
    return this._id
  }

  set show(show) {
    this._show = show
    Object.keys(this._cache).forEach(key => {
      this._cache[key].show = show
    })
  }

  get show() {
    return this._show
  }

  get layerEvent() {
    return this._layerEvent
  }

  get state() {
    return this._state
  }

  /**
   * The hook for added
   * @private
   */
  _addedHook() {}

  /**
   * The hook for removed
   * @private
   */
  _removedHook() {}

  /**
   *
   * @param viewer
   * @private
   */
  _onAdd(viewer) {
    this._viewer = viewer
    Object.keys(this._cache).forEach(key => {
      this._cache[key].fire(OverlayEventType.ADD, {
        scene: this._viewer.scene,
        layer: this
      })
    })
    this._addedHook && this._addedHook()
    this._state = State.ADDED
  }

  /**
   * The layer added callback function
   * Subclasses need to be overridden
   * @private
   */
  _onRemove() {
    if (this._viewer) {
      this._cache = {}
      this._removedHook && this._removedHook()
      this._state = State.REMOVED
    }
  }

  /**
   *
   * @param overlay
   * @returns {Layer}
   */
  addOverlay(overlay) {
    if (!this._cache[overlay.overlayId]) {
      this._viewer &&
        overlay.fire(OverlayEventType.ADD, {
          scene: this._viewer.scene,
          layer: this
        })
      this._cache[overlay.overlayId] = overlay
    }
    return this
  }

  /**
   *
   * @param overlay
   * @returns {Layer}
   */
  removeOverlay(overlay) {
    if (this._cache[overlay.overlayId]) {
      this._viewer &&
        overlay.fire(OverlayEventType.REMOVE, {
          scene: this._viewer.scene,
          layer: this
        })
      delete this._cache[overlay.overlayId]
    }
    return this
  }

  /**
   *
   * @param overlayId
   * @returns {undefined}
   */
  getOverlay(overlayId) {
    return this._cache[overlayId] || undefined
  }

  /**
   *
   * @param method
   * @param context
   * @returns {Layer}
   */
  eachOverlay(method, context) {
    Object.keys(this._cache).forEach(key => {
      method && method.call(context || this, this._cache[key])
    })
    return this
  }

  /**
   *
   * @returns {*[]}
   */
  getOverlays() {
    return Object.keys(this._cache).map(key => {
      return this._cache[key]
    })
  }

  /**
   *
   * @param viewer
   * @returns {Layer}
   */
  addTo(viewer) {
    if (viewer?.addLayer) {
      viewer.addLayer(this)
    }
    return this
  }

  /**
   * Registers Type
   * @param type
   */
  static registerType(type) {
    if (type) {
      LayerType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   * Returns type
   * @param type
   * @returns {*|undefined}
   */
  static getLayerType(type) {
    return LayerType[type.toLocaleUpperCase()] || undefined
  }
}

export default Layer
