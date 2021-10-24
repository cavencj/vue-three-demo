/**
 * @Author: Caven
 * @Date: 2020-01-03 12:18:17
 */

import State from '@dt-modules/state/State'
import { Util } from '@dt-modules/utils'
import { OverlayEventType, OverlayEvent } from '@dt-modules/event'
import OverlayType from './OverlayType'

class Overlay {
  constructor() {
    this._id = Util.uuid()
    this._bid = Util.uuid() // Business id
    this._delegate = undefined
    this._geometry = undefined
    this._material = undefined
    this._layer = undefined
    this._state = undefined
    this._show = true
    this._style = {}
    this._attr = {}
    this._overlayEvent = new OverlayEvent()
    this._overlayEvent.on(OverlayEventType.ADD, this._onAdd, this)
    this._overlayEvent.on(OverlayEventType.REMOVE, this._onRemove, this)
  }

  get overlayId() {
    return this._id
  }

  set id(id) {
    this._bid = id
    return this
  }

  get id() {
    return this._bid
  }

  set show(show) {
    this._show = show
    this._delegate && (this._delegate.visible = this._show)
    return this
  }

  get show() {
    return this._show
  }

  set attr(attr) {
    this._attr = attr
    return this
  }

  get attr() {
    return this._attr
  }

  get overlayEvent() {
    return this._overlayEvent
  }

  get delegate() {
    return this._delegate
  }

  get state() {
    return this._state
  }

  set material(material) {
    this._material = material.delegate || material
    this._delegate.material = this._material
    return this
  }

  get material() {
    return this._material
  }

  set contextMenu(menus) {
    this._contextMenu = menus
    return this
  }

  get contextMenu() {
    return this._contextMenu
  }

  /**
   * The hook for mount layer
   * Subclasses need to be overridden
   * @private
   */
  _mountedHook() {}

  /**
   * The hook for added
   * @returns {boolean}
   * @private
   */
  _addedHook() {
    if (!this._delegate) {
      return false
    }
    this._delegate.layerId = this._layer?.id
    this._delegate.overlayId = this._id
  }

  /**
   * The hook for removed
   * Subclasses need to be overridden
   * @private
   */
  _removedHook() {}

  /**
   * Add handler
   * @param scene
   * @param layer
   * @private
   */
  _onAdd({ scene, layer }) {
    this._layer = layer
    this._mountedHook && this._mountedHook()
    scene.delegate.add(this._delegate)
    this._addedHook && this._addedHook()
    this._state = State.ADDED
  }

  /**
   * Remove handler
   * @param scene
   * @param layer
   * @private
   */
  _onRemove({ scene, layer }) {
    scene.delegate.remove(this._delegate)
    this._removedHook && this._removedHook()
    this._state = State.REMOVED
  }

  /**
   * Sets Text with Style
   * @param text
   * @param textStyle
   * @returns {Overlay}
   */
  setLabel(text, textStyle) {
    return this
  }

  /**
   * Sets style
   * @param style
   * @returns {Overlay}
   */
  setStyle(style) {
    return this
  }

  /**
   * Removes from layer
   * @returns {Overlay}
   */
  remove() {
    if (this._layer) {
      this._layer.removeOverlay(this)
    }
    return this
  }

  /**
   * adds to layer
   * @param layer
   * @returns {Overlay}
   */
  addTo(layer) {
    if (layer && layer.addOverlay) {
      layer.addOverlay(this)
    }
    return this
  }

  /**
   * Subscribe event
   * @param type
   * @param callback
   * @param context
   * @returns {Overlay}
   */
  on(type, callback, context) {
    this._overlayEvent.on(type, callback, context || this)
    return this
  }

  /**
   * Unsubscribe event
   * @param type
   * @param callback
   * @param context
   * @returns {Overlay}
   */
  off(type, callback, context) {
    this._overlayEvent.off(type, callback, context || this)
    return this
  }

  /**
   * Trigger subscription event
   * @param type
   * @param params
   * @returns {Overlay}
   */
  fire(type, params) {
    this._overlayEvent.fire(type, params)
    return this
  }

  /**
   *
   * @param type
   */
  static registerType(type) {
    if (type) {
      OverlayType[type.toLocaleUpperCase()] = type.toLocaleLowerCase()
    }
  }

  /**
   *
   * @param type
   * @returns {*|undefined}
   */
  static getOverlayType(type) {
    return OverlayType[type.toLocaleUpperCase()] || undefined
  }
}

export default Overlay
