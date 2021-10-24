/**
 * @Author: Caven
 * @Date: 2021-10-23 16:16:19
 */

import State from '@dt-modules/state/State'
import Layer from '../Layer'

class VectorLayer extends Layer {
  constructor(id) {
    super(id)
    this._state = State.INITIALIZED
  }

  get type() {
    return Layer.getLayerType('vector')
  }
}

Layer.registerType('vector')

export default VectorLayer
