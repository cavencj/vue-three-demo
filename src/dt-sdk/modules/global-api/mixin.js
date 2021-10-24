/**
 * @Author: Caven
 * @Date: 2020-05-09 23:00:54
 */

const ignores = [
  'version',
  'accessToken',
  'baseUrl',
  'author',
  'home_page',
  'init',
  'ready',
  'use',
  'mixin',
  'Namespace',
  'Initialized'
]

/**
 * Mix other plug-in attributes to DT
 * @param DT
 * @returns this
 */
export function initMixin(DT) {
  DT.mixin = function(mixin) {
    for (let key in mixin) {
      ignores.indexOf(key) < 0 && (DT[key] = mixin[key])
    }
    return this
  }
}
