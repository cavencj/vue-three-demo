/**
 * @Author: Caven
 * @Date: 2021-10-24 09:44:51
 */

import { THREE } from '@dt-modules/namespace'
import Material from '../Material'

const ScanCircleFS = require('../shader/circle/ScanCircleFS.glsl')

/**
 *
 * @type {string}
 */
Material.ScanCircleType = 'ScanCircle'
Material.addType(Material.ScanCircleType, {
  uniforms: {
    u_speed: {
      type: 'f',
      value: 3.0
    }
  },
  fragmentShader: ScanCircleFS
})
