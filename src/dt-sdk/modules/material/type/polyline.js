/**
 * @Author: Caven
 * @Date: 2021-10-23 21:34:57
 */

import Material from '../Material'

const TrailLineFS = require('../shader/line/TrailLineFS.glsl')
const FlowLineFS = require('../shader/line/FlowLineFS.glsl')

/**
 *
 * @type {string}
 */
Material.TrailLineType = 'TrailLine'
Material.addType(Material.TrailLineType, {
  uniforms: {
    u_speed: {
      type: 'f',
      value: 3.0
    }
  },
  fragmentShader: TrailLineFS
})

/**
 *
 * @type {string}
 */
Material.FlowLineType = 'FlowLine'
Material.addType(Material.FlowLineType, {
  uniforms: {
    u_speed: {
      type: 'f',
      value: 3.0
    },
    u_percent: {
      type: 'f',
      value: 0.03
    },
    u_gradient: {
      type: 'f',
      value: 0.1
    }
  },
  fragmentShader: FlowLineFS
})
