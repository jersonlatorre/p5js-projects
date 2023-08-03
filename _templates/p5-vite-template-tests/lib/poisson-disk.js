import PoissonDiskSampling from 'poisson-disk-sampling'
import p from 'p5-sketch'

export default class PoissonDisk {
  static fill({ shape, minDistance, maxDistance, distanceFunction, tries }) {
    const poisson = new PoissonDiskSampling({
      shape,
      minDistance,
      maxDistance,
      distanceFunction,
      tries,
    })

    return poisson.fill().map((point) => p.createVector(point[0], point[1]))
  }
}
