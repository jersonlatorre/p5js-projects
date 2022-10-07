class Estudio1 {
  static counter = 0
  static params = {
    speed: 5,
    minRadius: 30,
    maxRadius: 65,
  }

  constructor(graphics) {
    this.graphics = graphics
    this.width = graphics.width
    this.height = graphics.height

    this.index = Estudio1.counter++
    let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
    this.color = colors[(this.index + 3) % colors.length]
    this.graphics.textFont(font)

    this.dots = []
    for (let i = 0; i < (this.width * this.height) / 4000; i++) {
      let dot
      if (random() < 0.9) {
        dot = new Dot(this, random(this.width), random(this.height))
      } else {
        dot = new MutatedDot(this, random(this.width), random(this.height))
      }
      this.dots.push(dot)
    }
  }

  draw() {
    this.drawBackground()
    this.drawDelaunay()
    this.drawDots()
  }

  drawBackground() {
    this.graphics.noStroke()
    this.graphics.fill(this.color)
    this.graphics.rect(0, 0, this.width, this.height)
  }

  drawDelaunay() {
    const nextHalfedge = (e) => (e % 3 === 2 ? e - 2 : e + 1)

    let points = []
    this.dots.forEach((dot) => {
      if (dot instanceof Dot) {
        points.push([dot.position.x, dot.position.y])
      }
    })

    let delaunay = Delaunator.from(points)
    for (let e = 0; e < delaunay.triangles.length; e++) {
      if (e > delaunay.halfedges[e]) {
        let i1 = delaunay.triangles[e]
        let i2 = delaunay.triangles[nextHalfedge(e)]
        let p1 = points[i1]
        let p2 = points[i2]
        let w = this.dots[i1].radius + this.dots[i2].radius
        w = map(w, 0 * Estudio1.params.minRadius, 2 * Estudio1.params.maxRadius, 0, 255)
        this.graphics.stroke(0, 50)
        this.graphics.strokeWeight(1)
        this.graphics.line(p1[0], p1[1], p2[0], p2[1])
      }
    }
  }

  drawDots() {
    this.dots.forEach((dot) => {
      dot.draw(this.graphics)
    })
  }
}
