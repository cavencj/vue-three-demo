/**
 * @Author: Caven
 * @Date: 2020-03-22 00:10:25
 */

import Position from '@dt-modules/position/Position'

class Parse {
  /**
   * Parses all kinds of coordinates to position
   * @param position
   * @returns {Position}
   */
  static parsePosition(position) {
    let result = new Position()
    if (!position) {
      return result
    }
    if (typeof position === 'string') {
      result = Position.fromString(position)
    } else if (Array.isArray(position)) {
      result = Position.fromArray(position)
    } else if (
      !(Object(position) instanceof Position) &&
      Object(position).hasOwnProperty('x') &&
      Object(position).hasOwnProperty('y')
    ) {
      result = Position.fromObject(position)
    } else if (Object(position) instanceof Position) {
      result = position
    }
    return result
  }

  /**
   * Parses all kinds of coordinates array to position array
   * @param positions
   * @returns {unknown[]}
   */
  static parsePositions(positions) {
    if (typeof positions === 'string') {
      if (positions.indexOf('#') >= 0) {
        throw new Error('the positions invalid')
      }
      positions = positions.split(';').filter(item => !!item)
    }
    return positions.map(item => {
      if (typeof item === 'string') {
        return Position.fromString(item)
      } else if (Array.isArray(item)) {
        return Position.fromArray(item)
      } else if (
        !(Object(item) instanceof Position) &&
        Object(item).hasOwnProperty('x') &&
        Object(item).hasOwnProperty('y')
      ) {
        return Position.fromObject(item)
      } else if (Object(item) instanceof Position) {
        return item
      }
    })
  }

  /**
   *
   * @param points
   * @returns {*[]}
   */
  static parsePointsToArray(points) {
    let result = []
    points.forEach(item => {
      result.push(item.x)
      result.push(item.y)
      result.push(item.z || 0)
    })
    return result
  }
}

export default Parse
