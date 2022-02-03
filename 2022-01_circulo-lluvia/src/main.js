let positions = []

let N = 100
let R1 = 240
let R2 = 2
let FOLLOW_SPEED = 0
let THICKNESS = 1
let SPEED_1 = 2
let SPEED_2 = 40

let headPosition
let timer = 0
let emitter

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)

  headPosition = createVector()
  emitter = new Emitter()

  for (let i = 0; i < N; i++) {
    positions.push(createVector(width / 2, height / 2))
  }

  for (let i = 0; i < N; i++) {
    draw()
  }
}

function fx(t) {
  let angle1 = t * SPEED_1
  let angle2 = t * SPEED_2
  let cx = cos(angle1) * R1 + windowWidth / 2
  let dx = cos(angle2) * R2 + cx
  return dx
}

function fy(t) {
  let angle1 = t * SPEED_1
  let angle2 = t * SPEED_2
  let cy = sin(angle1) * R1 + windowHeight / 2
  let dy = sin(angle2) * R2 + cy
  return dy
}

function draw() {
  background('black')

  let x = fx(timer)
  let y = fy(timer)
  timer += 0.01
  headPosition = createVector(x, y)

  positions.unshift(headPosition)
  positions.splice(N, 1)

  emitter.emit(positions[0].x, positions[0].y)

  noFill()
  for (let i = N - 1; i >= 0; i--) {
    let alpha = map(i, 0, N, 1, 0)
    let hue = map(i, 0, N, 340, 290)
    stroke(hue, 0, 100, alpha)
    strokeWeight(THICKNESS)
    if (i > 0) line(positions[i].x, positions[i].y, positions[i - 1].x, positions[i - 1].y)
  }

  noStroke()
  fill('white')
  circle(positions[0].x, positions[0].y, THICKNESS)
  fill('black')
  circle(positions[0].x, positions[0].y, THICKNESS * 0.6)

  emitter.draw()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.initialPosition = this.position.copy()
    this.velocity = p5.Vector.random2D().mult(random(1, 2))
    this.acceleration = createVector(0, 0.3)
    this.timer = 0
    this.lifeTime = random(5, 6)
    this.velocityDrag = random(0.8, 0.9)
    this.isDead = false
  }

  draw() {
    this.timer += deltaTime / 1000
    this.velocity.mult(this.velocityDrag)
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    noStroke()

    let t = map(this.timer, 0, this.lifeTime, 0, 1)
    t = 3 * t * t - 2 * t * t * t

    fill(0, 0, 100, lerp(1, 0, t))
    let size = map(this.timer, 0, this.lifeTime, 0, 8)
    circle(this.position.x, this.position.y, size)

    stroke(0, 0, 100, lerp(0.5, 0, t))
    strokeWeight(1)
    line(this.position.x, this.position.y, this.initialPosition.x, this.initialPosition.y)

    if (this.timer > this.lifeTime) {
      this.isDead = true
    }
  }
}

class Emitter {
  constructor() {
    this.particles = []
  }

  emit(x, y) {
    for (let i = 0; i < 1; i++) {
      let p = new Particle(x, y)
      this.particles.push(p)
    }
  }

  draw() {
    this.particles.forEach((p) => p.draw())
    this.particles = this.particles.filter((p) => !p.isDead)
  }
}
