/**
 * @Author: Caven
 * @Date: 2019-12-27 14:35:02
 */

class Position {
  constructor(x, y, z, heading, pitch, roll) {
    this._x = +x || 0
    this._y = +y || 0
    this._z = +z || 0
    this._heading = +heading || 0
    this._pitch = +pitch || 0
    this._roll = +roll || 0
  }

  set x(x) {
    this._x = +x
  }

  get x() {
    return this._x
  }

  set y(y) {
    this._y = +y
  }

  get y() {
    return this._y
  }

  set z(z) {
    this._z = +z
  }

  get z() {
    return this._z
  }

  set heading(heading) {
    this._heading = +heading
  }

  get heading() {
    return this._heading
  }

  set pitch(pitch) {
    this._pitch = +pitch
  }

  get pitch() {
    return this._pitch
  }

  set roll(roll) {
    this._roll = +roll
  }

  get roll() {
    return this._roll
  }

  /**
   *
   * @returns {string}
   */
  serialize() {
    let position = new Position(
      this._x,
      this._y,
      this._z,
      this._heading,
      this._pitch,
      this._roll
    )
    return JSON.stringify(position)
  }

  /**
   * clone a position
   * @returns {Position}
   */
  clone() {
    let position = new Position()
    position.x = this.x || 0
    position.y = this.y || 0
    position.z = this.z || 0
    position.heading = this.heading || 0
    position.pitch = this.pitch || 0
    position.roll = this.roll || 0
    return position
  }

  /**
   * clone a position
   * @deprecated
   * @returns {Position}
   */
  copy() {
    return this.clone()
  }

  /**
   *
   * @returns {*[]}
   */
  toArray() {
    return [this.x, this.y, this.z, this.heading, this.pitch, this.roll]
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `${this.x},${this.y},${this.z},${this.heading},${this.pitch},${this.roll}`
  }

  /**
   *
   * @returns {{x, heading, z, roll, pitch, y}}
   */
  toObject() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      heading: this.heading,
      pitch: this.pitch,
      roll: this.roll
    }
  }

  /**
   *
   * @param arr
   * @returns {Position}
   */
  static fromArray(arr) {
    let position = new Position()
    if (Array.isArray(arr)) {
      position.x = arr[0] || 0
      position.y = arr[1] || 0
      position.z = arr[2] || 0
      position.heading = arr[3] || 0
      position.pitch = arr[4] || 0
      position.roll = arr[5] || 0
    }
    return position
  }

  /**
   *
   * @param str
   * @returns {Position}
   */
  static fromString(str) {
    let position = new Position()
    if (str && typeof str === 'string') {
      let arr = str.split(',')
      position = this.fromArray(arr)
    }
    return position
  }

  /**
   *
   * @param obj
   * @returns {Position}
   */
  static fromObject(obj) {
    return new Position(obj.x, obj.y, obj.z, obj.heading, obj.pitch, obj.roll)
  }

  /**
   * Deserialize
   * @param valStr
   * @returns {Position}
   */
  static deserialize(valStr) {
    let position = new Position()
    let obj = JSON.parse(valStr)
    if (obj) {
      position.x = obj.x || 0
      position.y = obj.y || 0
      position.z = obj.z || 0
      position.heading = obj.heading || 0
      position.pitch = obj.pitch || 0
      position.roll = obj.roll || 0
    }
    return position
  }
}

export default Position
