/**
 * @Author: Caven
 * @Date: 2021-10-23 14:27:55
 */

const install = function(DT) {
  if (!DT) {
    throw new Error('Missing DT Base Package')
  }

  /**
   * start
   */
  DT.ready = callback => {
    try {
      if (!DT.Initialized) {
        // load components
        DT.init(() => {
          try {
            DT.mixin(require('./src/components.js').default)
            DT.Initialized = true
            callback && callback()
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
            DT.Initialized = false
          }
        })
      } else {
        callback && callback()
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      DT.Initialized = false
      throw e
    }
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.DT) {
  install(window.DT)
}

export default {
  // version: __VERSION__,
  // compile_time: __TIME__,
  install
}
