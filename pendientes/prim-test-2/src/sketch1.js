let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']

class Sketch1 {
  constructor() {
    this.n
    this.prim = new Prim()
    this.dots = []
    this.edges
    this.easycam = createEasyCam({ distance: 1200 })
    this.generateTree()

    setInterval(() => {
      this.generateTree()
    }, 1000)
  }

  draw() {
    this.easycam.rotateY(deltaTime / 1000)
    background(0)
    this.edges.forEach((edge) => {
      let p1 = this.dots[edge[0]].position
      let p2 = this.dots[edge[1]].position
      this.drawLine(p1, p2)
    })

    this.dots.forEach((point) => {
      point.draw()
    })
  }

  drawLine(p1, p2) {
    let n = 5
    let amp = 6
    beginShape()
    noFill()
    stroke('white')
    strokeWeight(1.5)
    for (let i = 0; i <= n; i++) {
      let t = i / n
      let p = p1
        .copy()
        .mult(t)
        .add(p2.copy().mult(1 - t))
      p.x += random(-amp, amp)
      p.y += random(-amp, amp)
      p.z += random(-amp, amp)
      vertex(p.x, p.y, p.z)
    }
    endShape()
  }

  generateTree() {
    this.n = 10 * floor(random(20, 40) / 10)
    this.dots = []
    for (let i = 0; i < this.n; i++) {
      let theta = random(2 * PI)
      let v = random()
      let phi = acos(2 * v - 1)
      let r = pow(random(), 1 / 3) * 250
      let x = r * sin(phi) * cos(theta)
      let y = 2 * r * sin(phi) * sin(theta)
      let z = r * cos(phi)
      this.dots.push(new Dot(x, y, z))
      // let p = createVector(x, y, z).normalize().mult(250)
      // dots.push(new Dot(p.x, p.y, p.z))
    }

    let points = []
    this.dots.forEach((dot) => {
      points.push(dot.position)
    })
    this.edges = this.prim.generateTree(points)
  }
}

class Dot {
  constructor(x, y, z) {
    this.position = createVector(x, y, z)
    this.radius = random(5, 13)
    this.color = random(colors)
  }

  draw() {
    push()
    translate(this.position.x, this.position.y, this.position.z)
    fill(this.color)
    noStroke()
    sphere(this.radius)
    pop()
  }
}
