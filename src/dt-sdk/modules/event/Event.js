/**
 * @Author: Caven
 * @Date: 2021-10-23 15:36:04
 */

class Event {
  constructor() {
    this._events = {}
    this._firingCount = 0
  }

  /**
   *
   * @param type
   * @param fn
   * @param context
   * @private
   */
  _on(type, fn, context) {
    let typeListeners = this._events[type]
    if (!typeListeners) {
      typeListeners = []
      this._events[type] = typeListeners
    }

    if (context === this) {
      context = undefined
    }
    let newListener = { fn: fn, ctx: context },
      listeners = typeListeners

    for (let i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i].fn === fn && listeners[i].ctx === context) {
        return
      }
    }
    listeners.push(newListener)
  }

  /**
   *
   * @param type
   * @param fn
   * @param context
   * @private
   */
  _off(type, fn, context) {
    let listeners, i, len
    if (!this._events) {
      return
    }

    listeners = this._events[type]

    if (!listeners) {
      return
    }

    if (!fn) {
      for (i = 0, len = listeners.length; i < len; i++) {
        listeners[i].fn = () => {
          return false
        }
      }
      delete this._events[type]
      return
    }

    if (context === this) {
      context = undefined
    }

    if (listeners) {
      for (i = 0, len = listeners.length; i < len; i++) {
        let l = listeners[i]
        if (l.ctx !== context) {
          continue
        }
        if (l.fn === fn) {
          l.fn = () => {
            return false
          }

          if (this._firingCount) {
            /* copy array in case events are being fired */
            this._events[type] = listeners = listeners.slice()
          }
          listeners.splice(i, 1)

          return
        }
      }
    }
  }

  /**
   *
   * @param type
   * @param data
   * @returns {Event}
   * @private
   */
  _fire(type, data) {
    if (this._events) {
      let listeners = this._events[type]
      if (listeners) {
        this._firingCount = this._firingCount + 1 || 1
        for (let i = 0, len = listeners.length; i < len; i++) {
          let l = listeners[i]
          l.fn.call(l.ctx || this, data)
        }

        this._firingCount--
      }
    }
    return this
  }

  /**
   *
   * @param type
   * @param fn
   * @param context
   * @returns {Event}
   */
  on(type, fn, context) {
    this._on(type, fn, context)
    return this
  }

  /**
   *
   * @param type
   * @param fn
   * @param context
   * @returns {Event}
   */
  off(type, fn, context) {
    this._off(type, fn, context)
    return this
  }

  /**
   *
   * @param type
   * @param fn
   * @param context
   * @returns {Event}
   */
  once(type, fn, context) {
    return this.on(type, e => {
      fn(e)
      this.off(type, fn, context)
    })
  }

  /**
   *
   * @param type
   * @param params
   * @returns {Event}
   */
  fire(type, params) {
    this._fire(type, params)
    return this
  }
}

export default Event
