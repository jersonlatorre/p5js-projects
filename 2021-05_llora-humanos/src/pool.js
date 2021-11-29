class Pool {
  constructor(left, right, y, hue) {
    this.points = []
    this.left = left
    this.right = right
    this.y = y
    this.hue = hue

    let w = this.right - this.left
    let n = 30

    for (let i = 0; i <= n; i++) {
      this.points.push(new Particle(left + w / n * i, this.y))
    }

    this.draw()
  }

  hit(x, force) {
    let w = this.right - this.left
    let n = this.points.length
    let i = floor((x - this.left) / (w / n))
    i = constrain(i, 0, this.points.length - 1)
    this.points[i].move(this.points[i].x, this.points[i].y + force)
  }

  draw() {
    let n = this.points.length
    let nx = 0
    let ny = 0

    for (let i = 0; i < n; i++) {
      nx = this.points[i].x
      if (i > 1 && i < n - 1) {
        ny = this.points[i - 1].y * 0.5 + this.points[i + 1].y * 0.5
      } else {
        ny = this.points[i].vy
      }

      this.points[i].move(nx, ny)
      this.points[i].draw()
    }

    noFill()
    fill(this.hue, 100, 100)
    noStroke()
    beginShape()

    vertex(this.left, 1080)
    vertex(this.left, 1080)
    vertex(this.left, 1080 * 0.6667)
    vertex(this.left, 1080 * 0.6667)

    for (let i = 0; i < n; i++) {
      let p = this.points[i]
      if (i == 0) {

        vertex(p.x, p.y)
      } else {
        curveVertex(p.x, p.y)

      }
    }

    vertex(this.right, 1080 * 0.6667)
    vertex(this.right, 1080 * 0.6667)
    vertex(this.right, 1080)
    vertex(this.right, 1080)
    endShape()
  }
}
