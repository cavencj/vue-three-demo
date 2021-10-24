/**
 * @Author: Caven
 * @Date: 2021-10-23 20:15:01
 */
import { THREE } from '@dt-modules/namespace'
import MaterialCache from './MaterialCache'

const CommonVS = require('./shader/CommonVS.glsl')
const CommonFS = require('./shader/CommonFS.glsl')

const DEF_UNIFORMS = {
  u_frameNumber: {
    type: 'f',
    value: 1.0
  },
  u_time: {
    type: 'f',
    value: 1.0
  },
  u_resolution: {
    type: 'v2',
    value: new THREE.Vector2()
  },
  u_color: {
    type: 'v3',
    value: new THREE.Color(1, 1, 1)
  },
  u_alpha: {
    type: 'f',
    value: 1.0
  },
  u_isY: {
    type: 'b',
    value: false
  }
}

const DEF_OPTS = {
  transparent: true,
  side: THREE.DoubleSide,
  uniforms: DEF_UNIFORMS,
  vertexShader: CommonVS,
  fragmentShader: CommonFS
}

class Material {
  static _types = {}

  constructor(options) {
    this._delegate = new THREE.ShaderMaterial({
      ...DEF_OPTS,
      ...options
    })
    MaterialCache.addMaterial(this._delegate)
  }

  get delegate() {
    return this._delegate
  }

  /**
   *
   * @param type
   * @param options
   */
  static addType(type, options) {
    Material._types[type] = {
      ...options,
      uniforms: {
        ...DEF_UNIFORMS,
        ...options.uniforms
      }
    }
  }

  /**
   *
   * @param type
   * @param options
   * @returns {Material}
   */
  static fromType(type, options) {
    if (!Material._types[type]) {
      return new THREE.MeshBasicMaterial()
    }
    let m_options = Material._types[type]
    let newUniforms = {}
    Object.keys(options).forEach(key => {
      let value = options[key]
      if (key.indexOf('color') >= 0) {
        value = new THREE.Color(options[key])
      }
      newUniforms['u_' + key] = {
        value: value
      }
      newUniforms[key] = {
        value: value
      }
    })
    return new Material({
      ...m_options,
      uniforms: {
        ...m_options.uniforms,
        ...newUniforms
      }
    })
  }
}

export default Material
