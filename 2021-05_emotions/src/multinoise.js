class Multinoise {
  constructor(count) {
    this.simplex = new SimplexNoise()
  }
  
  get(t, c) {
    let count = c
    let raws = []
    let values = []
    let cumulatives = [0]
    let s = 0

    for (let i = 0; i < count; i++) {
      raws[i] = map(this.simplex.noise2D(i, t), -1, 1, 0, 1)
      s += raws[i]
    }

    let a = 0
    for (let i = 0; i < count; i++) {
      values[i] = raws[i] / s
      a += values[i]
      cumulatives[i + 1] = a
    }

    return { values: values, cumulatives: cumulatives, count: count }
  }
}
