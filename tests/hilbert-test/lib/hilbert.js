export default class Hilbert {
  static hilbertIndexToCoords(index, order) {
    let n = 1 << order
    let x = 0,
      y = 0

    for (let s = 1; s < n; s *= 2) {
      let rx = 1 & (index >> 1)
      let ry = 1 & (index ^ rx)
      ;[x, y] = Hilbert.rotate(s, x, y, rx, ry)
      x += s * rx
      y += s * ry
      index >>= 2
    }
    return [x, y]
  }

  static coordsToHilbertIndex(x, y, order) {
    let n = 1 << order
    let index = 0

    for (let s = n / 2; s > 0; s /= 2) {
      let rx = (x & s) > 0 ? 1 : 0
      let ry = (y & s) > 0 ? 1 : 0
      index += s * s * ((3 * rx) ^ ry)
      ;[x, y] = Hilbert.rotate(s, x, y, rx, ry)
    }
    return index
  }

  static rotate(n, x, y, rx, ry) {
    if (ry === 0) {
      if (rx === 1) {
        x = n - 1 - x
        y = n - 1 - y
      }
      return [y, x]
    }
    return [x, y]
  }
}
