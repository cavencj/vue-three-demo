/**
 * @Author: Caven
 * @Date: 2021-10-23 19:56:17
 */

const DEF_UNIFORMS = ['frameNumber', 'time', 'resolution']

class MaterialCache {
  static _cache = []

  /**
   *
   * @param material
   * @returns {MaterialCache}
   */
  static addMaterial(material) {
    this._cache.push(material)
    return this
  }

  /**
   *
   * @param material
   * @returns {MaterialCache}
   */
  static removeMaterial(material) {
    this._cache.splice(this._cache.indexOf(material), 1)
    return this
  }

  /**
   *
   * @returns {*[]}
   */
  static getMaterials() {
    return this._cache
  }

  /**
   *
   * @param frameState
   */
  static update(frameState) {
    this._cache.forEach(material => {
      //material.resolution = frameState.resolution
      DEF_UNIFORMS.forEach(key => {
        if (material.uniforms['u_' + key]) {
          material.uniforms['u_' + key].value = frameState[key]
        }
        if (material.uniforms[key]) {
          material.uniforms[key].value = frameState[key]
        }
      })
    })
  }
}

export default MaterialCache
