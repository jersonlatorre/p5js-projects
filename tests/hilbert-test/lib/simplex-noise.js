import { createNoise2D, createNoise3D, createNoise4D } from 'simplex-noise'

let noise2D = createNoise2D()
let noise3D = createNoise3D()
let noise4D = createNoise4D()

export default class SimplexNoise {
  static seed(value) {
    let prng = value ? () => value : Math.random
    noise2D = createNoise2D({ random: prng })
    noise3D = createNoise3D({ random: prng })
    noise4D = createNoise4D({ random: prng })
  }

  static noise() {
    let nArgs = arguments.length
    switch (nArgs) {
      case 1:
        return noise2D(arguments[0], 0)
      case 2:
        return noise2D(arguments[0], arguments[1])
      case 3:
        return noise3D(arguments[0], arguments[1], arguments[2])
      case 4:
        return noise4D(arguments[0], arguments[1], arguments[2], arguments[3])
    }
  }
}