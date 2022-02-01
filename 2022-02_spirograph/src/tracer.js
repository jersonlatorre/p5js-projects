class Tracer {
  constructor() {
    this.points = []
  }

  addPoint(p) {
    this.points.push(p)
  }

  clear() {
    this.points = []
  }

  draw() {
    if (this.points.length > PARAMS.tailSize) {
      for (let i = 0; i < this.points.length - PARAMS.tailSize; i++) {
        this.points.shift()
      }
    }

    let n = this.points.length

    if (n > 1) {
      let hue = 0
      stroke(hue, 0, 100, PARAMS.thickness)
      strokeWeight(1)
      line(this.points[0].x, this.points[0].y, this.points[n - 1].x, this.points[n - 1].y)

      noStroke()
      fill(hue, 0, 100, PARAMS.thickness)
      circle(this.points[0].x, this.points[0].y, 3)
      circle(this.points[n - 1].x, this.points[n - 1].y, 3)
    }
  }
}
