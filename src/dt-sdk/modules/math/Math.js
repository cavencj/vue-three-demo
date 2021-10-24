/**
 * @Author: Caven
 * @Date: 2021-10-24 09:15:52
 */

class DTMath {
  static TWO_PI = 2.0 * Math.PI

  static RADIANS_PER_DEGREE = Math.PI / 180.0

  static DEGREES_PER_RADIAN = 180.0 / Math.PI

  /**
   *
   * @param radians
   * @returns {number}
   */
  static toDegrees(radians) {
    return radians * DTMath.DEGREES_PER_RADIAN
  }

  /**
   *
   * @param degrees
   * @returns {number}
   */
  static toRadians(degrees) {
    return degrees * DTMath.RADIANS_PER_DEGREE
  }
}

export default DTMath
