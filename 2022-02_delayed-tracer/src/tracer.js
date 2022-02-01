class Tracer {
  constructor() {
    this.points = []
  }

  addPoint(p) {
    this.points.push(p)
    if (this.points.length > N) {
      this.points.shift()
    }
  }

  draw() {
    let n = this.points.length

    for (let i = n - 1; i > 1; i--) {
      this.points[i - 1] = p5.Vector.lerp(this.points[i - 1], this.points[i], FOLLOW_SPEED)

      strokeWeight(map(i, 0, n, 1, THICKNESS))
      stroke('white')
      line(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y)
    }
  }
}
