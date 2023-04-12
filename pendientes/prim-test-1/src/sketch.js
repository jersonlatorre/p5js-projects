let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let cameraPosition
let cameraDistance
let poisson

class Sketch {
  constructor() {
    this.initialize()
  }

  draw() {
    this.easycam.rotateY(deltaTime / 1200)

    push()
    clear()
    translate(-540, -540)
    background(255)
    drawingContext.enable(drawingContext.BLEND)
    blendMode(MULTIPLY)

    this.lineDrawers.forEach((lineDrawer) => {
      lineDrawer.draw()
    })

    this.dots.forEach((dot) => {
      dot.draw()
    })

    if (this.isDrawingFinished()) {
      // console.log('finished')
      this.initialize()
      fxpreview()
    }
    pop()
  }

  drawLine(p1, p2) {
    let n = 1
    let amp = 0
    let mp = p1.copy().add(p2).mult(0.5)
    let d = mp.copy().sub(cameraPosition).mag()
    d = map(d, cameraDistance - 250, cameraDistance + 250, 255, 50)
    let w = map(d, 255, 100, 1, 1)

    beginShape()
    noFill()
    stroke(255, d)
    strokeWeight(w)
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

  initialize() {
    // this.n = 100
    // this.dots = []
    // for (let i = 0; i < this.n; i++) {
    //   let theta = random(2 * PI)
    //   let v = random()
    //   let phi = acos(2 * v - 1)
    //   let r = pow(random(), 1 / 3) * 250
    //   let x = r * sin(phi) * cos(theta)
    //   let y = r * sin(phi) * sin(theta)
    //   let z = r * cos(phi)
    //   this.dots.push(new Dot(x, y, z))
    //   // let p = createVector(x, y, z).normalize().mult(250)
    //   // this.dots.push(new Dot(p.x, p.y, p.z))
    // }
    this.prim = new Prim()
    this.dots = []
    this.edges
    this.easycam = createEasyCam({ distance: 1200 })
    poisson = new PoissonDiskSampling({
      shape: [500, 500, 500],
      minDistance: 35,
    })

    this.points = poisson.fill()

    this.points.forEach((point) => {
      let p = createVector(point[0] - 250, point[1] - 250, point[2] - 250)
      // let d = p.mag()
      let factor = 0.005
      let d = noise((p.x + 250) * factor, (p.y + 250) * factor, (p.z + 250) * factor)
      if (d < 0.33) {
        this.dots.push(new Dot(p.x, p.y, p.z))
      }
    })

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
    this.radius = random(3, 8)
    this.color = random(colors)
  }

  draw() {
    push()
    translate(this.position.x, this.position.y, this.position.z)
    let d = this.position.copy().sub(cameraPosition).mag()
    d = map(d, cameraDistance - 250, cameraDistance + 250, 255, 0)
    let c = color(this.color)
    let r = map(d, 0, 255, 0, c.levels[0])
    let g = map(d, 0, 255, 0, c.levels[1])
    let b = map(d, 0, 255, 0, c.levels[2])
    // noLoop()
    fill(color(r, g, b))
    noStroke()
    sphere(this.radius)
    pop()
  }
}
