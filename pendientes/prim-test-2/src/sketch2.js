let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
class Sketch2 {
  constructor() {
    this.easycam = createEasyCam({ distance: 800 })
    this.prim = new Prim()
    this.dots = []
    this.edges
    this.lineDrawers = []
    this.selectedNeighbors = [0]
    this.generateTree()
    this.addLineDrawersFor(0, 1)
    this.dots[0].born()
    this.centerRadius = random(100, 200)
  }

  draw() {
    background(255)
    noStroke()
    fill(0)
    sphere(this.centerRadius)
    this.easycam.rotateY((0.6 * deltaTime) / 1000)
    this.lineDrawers.forEach((lineDrawer) => {
      lineDrawer.draw()
    })

    this.dots.forEach((point) => {
      point.draw()
    })
  }

  addLineDrawersFor(index, level) {
    let neighbors = this.findNeighborsFor(index)
    neighbors.forEach((neighbor) => {
      this.lineDrawers.push(new LineDrawer(this, index, neighbor, level))
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
    if (neighbors.length == 0) {
      this.dots[index].born()
    }
    return neighbors
  }

  generateTree() {
    let n = random(60, 200)
    this.dots = []
    for (let i = 0; i < n; i++) {
      let theta = random(2 * PI)
      let v = random()
      let phi = acos(2 * v - 1)
      let r = pow(random(), 1 / 3) * 270
      let x = r * sin(phi) * cos(theta)
      let y = r * sin(phi) * sin(theta)
      let z = r * cos(phi)
      // let dot = new Dot(i, x, y, z)
      // this.dots.push(dot)
      let p = createVector(x, y, z).normalize().mult(250)
      this.dots.push(new Dot(i, p.x, p.y, p.z))
    }

    let points = []
    this.dots.forEach((dot) => {
      points.push(dot.position)
    })
    this.edges = this.prim.generateTree(points)
  }
}

class Dot {
  constructor(index, x, y, z) {
    this.position = createVector(x, y, z)
    this.radius = random(5, 30)
    this.color = random(colors)
    this.index = index
    this.isBorn = false
    this.size = 0
  }

  draw() {
    if (this.isBorn) {
      this.size = lerp(this.size, this.radius, (2.5 * deltaTime) / 1000)
    }

    push()
    translate(this.position.x, this.position.y, this.position.z)
    noStroke()
    fill(this.color)
    sphere(this.size)
    pop()
  }

  born() {
    this.isBorn = true
  }
}

class LineDrawer {
  constructor(parent, i1, i2, level) {
    this.level = level
    this.parent = parent
    this.i2 = i2
    this.p1 = parent.dots[i1].position.copy()
    this.p2 = parent.dots[i2].position.copy()
    this.start = this.p1.copy()
    this.end = this.p1.copy()
    this.t = 0
    this.dt = 3 / pow(level, 0.5)
    // this.dt = random(0.2, 0.4) / pow(level, 0.5)
    this.isFinished = false
  }

  draw() {
    stroke(80)
    strokeWeight(2.5)
    if (this.isFinished) {
      line(this.p1.x, this.p1.y, this.p1.z, this.p2.x, this.p2.y, this.p2.z)
    } else {
      let t = sqrt(this.t)
      this.end = p5.Vector.lerp(this.p1, this.p2, t)
      this.t += this.dt * deltaTime * 0.04

      if (this.t >= 1) {
        this.isFinished = true
        this.parent.addLineDrawersFor(this.i2, this.level + 1)
      }

      line(this.start.x, this.start.y, this.start.z, this.end.x, this.end.y, this.end.z)
    }
  }
}
