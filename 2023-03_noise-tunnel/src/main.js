let COLORS = ['#FF5B65', '#FFA24B', '#FCDF5F', '#49D8EE', '#F5EFE7']

const N_CIRCLES = 25
const TUNNEL_SPEED = 0.35
let minRadiusFactor = 0.2
let maxRadiusFactor = 1.5
const NOISE_SPEED = 0.5
const NOISE_OFFSET = 1
const NOISE_FORCE = 0.7

let simplex = new SimplexNoise()
let noiseCircles = []

let speed = 0
let minRadius
let maxRadius
let handler
let hx = 0
let hy = 0

function setup() {
  createCanvas(1080, 1080, WEBGL)
  ortho(-width / 2, width / 2, -height / 2, height / 2)

  for (let i = 0; i < N_CIRCLES; i++) {
    noiseCircles.push(new NoiseCircle(i / N_CIRCLES, COLORS[i % 5], true))
  }

  noiseCircles.push(new NoiseCircle(0, 'rgb(0, 0, 0)', false))
  handler = new Handler()
}

function draw() {
  minRadius = minRadiusFactor * max(width, height)
  maxRadius = maxRadiusFactor * max(width, height)
  background('white')
  blendMode(BLEND)
  noiseCircles.forEach((circle) => {
    circle.draw()
  })

  handler.draw()

  hx = lerp(hx, handler.x, 0.1)
  hy = lerp(hy, handler.y, 0.1)

  speed = map(hx, -1, 1, -TUNNEL_SPEED, TUNNEL_SPEED)
  minRadiusFactor = map(hy, -1, 1, 0.1, 0.7)
}

class NoiseCircle {
  constructor(t, c, move) {
    this.t = t
    this.originalColor = color(c)
    this.color = color(c)
    this.move = move
  }

  draw() {
    if (this.move) this.t += (speed * deltaTime) / 1000
    if (this.t > 1) this.t -= 1
    if (this.t < 0) this.t += 1

    push()
    let z = lerp(10, -10, this.t)
    let radius = lerp(minRadius, maxRadius, this.t)

    translate(0, 0, z)
    let dots = []
    let N = 200
    for (let i = 0; i < N; i++) {
      let angle = map(i, 0, N, 0, 2 * PI)
      let xx = NOISE_FORCE * cos(angle) + 1
      let yy = NOISE_FORCE * sin(angle) + 1
      let n = simplex.noise(xx, yy, (NOISE_SPEED * millis()) / 1000 + this.t * NOISE_OFFSET)

      let r = radius * (0.5 + map(n, -1, 1, -0.5, 0.5) * map(this.t, 0, 1, 0.0, 3))
      let x = r * cos(angle)
      let y = r * sin(angle)

      dots.push([x, y])
    }

    let t = this.t

    let brightness = 1
    if (this.move && t < 0.2) {
      brightness = map(t, 0, 0.2, 0, 1)
    }

    let r = red(this.originalColor)
    let g = green(this.originalColor)
    let b = blue(this.originalColor)
    r *= brightness
    g *= brightness
    b *= brightness
    this.color.setRed(r)
    this.color.setGreen(g)
    this.color.setBlue(b)

    stroke(0)
    strokeWeight(1 * brightness)
    noStroke()
    fill(this.color)

    beginShape()
    for (let i = 0; i < N; i++) {
      let p = dots[i]
      vertex(p[0], p[1])
    }
    endShape(CLOSE)
    pop()
  }
}

function windowResized() {
  maxRadius = 2 * max(width, height)
}

class HandlerState {
  static IDLE = 0
  static DRAG = 1
}

class Handler {
  constructor() {
    this.x = 0
    this.y = 0
    this.squareX = width * 0.25
    this.squareY = width * 0.25
    this.squareWidth = width * 0.2
    this.squareHeight = width * 0.2
    this.circleX = this.squareX + this.squareWidth / 2
    this.circleY = this.squareY + this.squareHeight / 2
    this.state = HandlerState.IDLE
  }

  draw() {
    translate(0, 0, 10)

    // square
    stroke(255)
    strokeWeight(5)
    fill(0, 80)
    rect(this.squareX, this.squareY, this.squareWidth, this.squareHeight)

    this.x = map(this.circleX, this.squareX, this.squareX + this.squareWidth, -1, 1)
    this.y = map(this.circleY, this.squareY, this.squareY + this.squareHeight, 1, -1)

    switch (this.state) {
      case HandlerState.IDLE:
        if (mouseIsPressed) {
          let d = dist(this.circleX, this.circleY, mouseX - width / 2, mouseY - width / 2)
          if (d < 20) {
            this.state = HandlerState.DRAG
          }
        }
        break
      case HandlerState.DRAG:
        this.circleX = mouseX - width / 2
        this.circleY = mouseY - width / 2

        if (this.circleX < this.squareX) this.circleX = this.squareX
        if (this.circleY < this.squareY) this.circleY = this.squareY
        if (this.circleX > this.squareX + this.squareWidth)
          this.circleX = this.squareX + this.squareWidth
        if (this.circleY > this.squareY + this.squareWidth)
          this.circleY = this.squareY + this.squareWidth

        if (!mouseIsPressed) {
          this.state = HandlerState.IDLE
        }
        break
    }
    // circle
    noStroke()
    fill(255)
    circle(this.circleX, this.circleY, 25)
  }
}
