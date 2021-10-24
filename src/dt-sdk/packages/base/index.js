/**
 * @Author: Caven
 * @Date: 2021-10-23 14:04:18
 */

import { initMixin, initUse } from '@dt-modules/global-api'

let DT = {
  version: '0.1.0',
  Namespace: {},
  Initialized: false
}

// init global api
//

initMixin(DT)
initUse(DT)

// load THREE
let threeLoaded = false
DT.init = callback => {
  if (!threeLoaded) {
    new Promise((resolve, reject) => {
      let THREE = require('three')
      resolve(THREE)
    })
      .then(THREE => {
        // set THREE to Namespace
        DT.Namespace['THREE'] = THREE
        threeLoaded = true
        delete window['THREE']
        callback && callback()
      })
      .catch(e => {})
  } else {
    callback && callback()
  }
}

export default DT
