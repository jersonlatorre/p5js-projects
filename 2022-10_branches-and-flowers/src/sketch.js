let poisson
let prim
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']

class Sketch3 {
  constructor() {
    textAlign(CENTER, CENTER)
    rectMode(CENTER)
    this.initialize()
  }

  draw(graphics) {
    graphics.push()
    graphics.clear()
    graphics.translate(-540, -540)
    graphics.background(255)
    graphics.drawingContext.enable(graphics.drawingContext.BLEND)
    graphics.blendMode(MULTIPLY)

    this.lineDrawers.forEach((lineDrawer) => {
      lineDrawer.draw(graphics)
    })

    this.dots.forEach((dot) => {
      dot.draw(graphics)
    })

    if (this.isDrawingFinished()) {
      // console.log('finished')
      this.initialize()
      fxpreview()
    }
    graphics.pop()
  }

  isDrawingFinished() {
    // check if finished
    let isAllDotsFinished = true
    for (let i = 0; i < this.dots.length; i++) {
      let dot = this.dots[i]
      isAllDotsFinished = isAllDotsFinished && dot.isFinished
    }
    return isAllDotsFinished
  }

  calculateAngleFor(index) {
    let other
    this.edges.forEach((edge) => {
      if (edge[0] == index) {
        other = edge[1]
      } else if (edge[1] == index) {
        other = edge[0]
      }
    })
    let p1 = this.dots[index].position
    let p2 = this.dots[other].position
    return p1.copy().sub(p2).heading()
  }

  addLineDrawersFor(index) {
    let neighbors = this.findNeighborsFor(index)
    if (neighbors.length == 0) {
      let angle = this.calculateAngleFor(index)
      this.dots[index].born(true, angle)
    } else {
      this.dots[index].born(false)
    }
    neighbors.forEach((neighbor) => {
      this.lineDrawers.push(new LineDrawer(this, index, neighbor))
      this.selectedNeighbors.push(neighbor)
    })
  }

  findNeighborsFor(index) {
    let neighbors = []
    this.edges.forEach((edge) => {
      if (edge[0] == index && !this.selectedNeighbors.includes(edge[1])) {
        neighbors.push(edge[1])
      } else if (edge[1] == index && !this.selectedNeighbors.includes(edge[0])) {
        neighbors.push(edge[0])
      }
    })

    return neighbors
  }

  initialize() {
    prim = new Prim()
    poisson = new PoissonDiskSampling({
      shape: [1080, 1080],
      minDistance: 1080 * 0.02,
      maxDistance: 1080 * 0.02,
      tries: 30,
    }, fxrand)

    // generates a mst
    this.dots = []
    this.edges = []
    this.lineDrawers = []
    let pdPoints = poisson.fill()
    let points = []
    let index = 0

    noiseSeed(new Date().getTime())

    pdPoints.forEach((pdPoint) => {
      let x = pdPoint[0]
      let y = pdPoint[1]
      let factor = 0.01
      if (noise(x * factor, y * factor) < 0.32) {
        if (this.isInsideRegion(x, y)) {
          let p = createVector(x, y)
          points.push(p)
          this.dots.push(new Dot(index, p.x, p.y, 0))
          index++
        }
      }
    })
    this.edges = prim.generateTree(points)

    // select a random point from the tree
    let randomPointIndex = this.edges[parseInt(fxrandom(0, this.edges.length))][0]
    this.selectedNeighbors = [randomPointIndex]
    this.addLineDrawersFor(randomPointIndex)
  }

  isInsideRegion(x, y) {
    let a =
      ((x - 1080 / 2) * (x - 1080 / 2)) / (1080 * 1080 * 0.12) +
      ((y - 1080 / 2) * (y - 1080 / 2)) / (1080 * 1080 * 0.12)
    return a <= 1
  }
}

class Dot {
  constructor(index, x, y, z) {
    this.position = createVector(x, y, z)
    this.radius = fxrandom(20, 42)
    this.color = colors[parseInt(fxrandom(0, colors.length))]
    this.index = index
    this.isBorn = false
    this.isFinished = false
    this.size = 0
    this.t = 0
    this.angle = 0
  }

  easeOutBack(t) {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  }

  easeOutElastic(t) {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  }

  draw() {
    if (this.isBorn) {
      this.t += (0.5 * deltaTime) / 1000
      if (this.t > 1) {
        this.t = 1
        this.isFinished = true
      }
      let t = this.t
      let p = this.easeOutElastic(t)
      p = pow(p, 0.4)
      this.size = lerp(0, this.radius, p)

      graphics.push()
      graphics.translate(this.position.x, this.position.y)
      graphics.rotate(this.angle)
      // rect(0, 0, 40, 10)

      let n = 6
      graphics.noStroke()
      graphics.fill(this.color)
      for (let i = 0; i < n; i++) {
        let angleMax = map(this.size, 0, this.radius, 0, PI * 0.35)
        let angle = map(i, 0, n - 1, -angleMax, angleMax)
        graphics.push()
        graphics.rotate(angle - PI / 2)
        graphics.stroke(this.color)
        graphics.strokeWeight(this.size * 0.25)
        graphics.line(0, 0, 0, this.size)
        graphics.pop()
      }
      graphics.pop()
    }
  }

  born(isActive, angle) {
    this.isBorn = true
    if (isActive) {
      this.angle = angle
    } else {
      this.radius = 0
    }
  }
}

class LineDrawer {
  constructor(parent, i1, i2) {
    this.parent = parent
    this.i2 = i2
    this.p1 = parent.dots[i1].position.copy()
    this.p2 = parent.dots[i2].position.copy()
    this.start = this.p1.copy()
    this.end = this.p1.copy()
    this.t = 0
    this.isFinished = false
    this.speed = fxrandom(0.4, 0.8) / this.p1.copy().sub(this.p2).mag()
  }

  draw() {
    graphics.stroke(150)
    graphics.strokeWeight(3.5)
    if (this.isFinished) {
      graphics.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
    } else {
      let t = sqrt(this.t)
      this.end = p5.Vector.lerp(this.p1, this.p2, t)
      this.t += deltaTime * this.speed

      if (this.t >= 1) {
        this.isFinished = true
        this.parent.addLineDrawersFor(this.i2, this.level + 1)
      }

      graphics.line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
  }
}
