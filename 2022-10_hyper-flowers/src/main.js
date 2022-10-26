let agents = []
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let fps
let maxHistory
let maxSpeed
let maxSize
let n

let graphics
let w

function setup() {
  w = min(windowWidth, windowHeight)
  createCanvas(w, w)

  graphics = createGraphics(1080, 1080)

  fps = 45
  maxHistory = fps
  maxSize = fxrandom(15, 28)
  maxSpeed = 15
  n = 40

  for (let i = 0; i < n; i++) {
    let angle = fxrandom(0, 2 * PI)
    let radius = fxrandom(0, 100)
    x = radius * cos(angle) + graphics.width / 2
    y = radius * sin(angle) + graphics.height / 2
    agents.push(new Boid(x, y))
  }
}

function draw() {
  background('yellow')
  graphics.background('black')
  agents.forEach((agent) => {
    agent.draw(graphics)
  })

  image(graphics, 0, 0, w, w)
}

class Boid extends Agent {
  constructor(x, y) {
    super(x, y, 0)
    this.maxSpeed = 0
    this.maxSteer = 1
    this.color = colors[parseInt(fxrandom(0, colors.length))]
    if (fxrand() < 0.2) this.color = '#fff'
    this.weight = fxrandom(5, 8)
    this.history = []
    this.separateDistance = fxrandom(20, 200)
  }

  draw(graphics) {
    this.maxSpeed = map(frameCount, 0, fps, maxSpeed, 0)
    this.addSeparate({ neighbors: agents, separateDistance: this.separateDistance })

    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity)

    this.history.push(this.position.copy())
    if (this.history.length > maxHistory) this.history.shift()

    this.history.forEach((point, i) => {
      let t = map(i, 0, this.history.length, 0, 1)
      t = 0.5 + 0.5 * sin(PI * (2 * t - 0.5))
      let size = this.weight * t * maxSize
      let c = color(this.color)

      c.setAlpha(255 * t)
      graphics.stroke(c)
      graphics.strokeWeight(0.4)
      graphics.noFill()
      graphics.circle(point.x, point.y, size)

      if (i == this.history.length - 1) {
        graphics.fill(255)
        graphics.noStroke()
        graphics.circle(point.x, point.y, 7)
      }
    })

    if (frameCount === fps) {
      noLoop()
      fxpreview()
    }
  }
}

function fxrandom(a, b) {
  return a + fxrand() * (b - a)
}

function fxrandomAngle() {
  let angle = fxrand() * 2 * PI
  return angle
}
