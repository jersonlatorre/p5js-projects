const FACTOR = 0.5

const SPEED = 0.2
const N = 25
const rx = 280
const ry = 120

let time = 0
let simplex

function setup() {
  createCanvas(1080 * FACTOR, 1920 * FACTOR)
  simplex = new SimplexNoise('2')
}

function draw() {
  scale(FACTOR)
  time += SPEED * deltaTime / 1000

  blendMode(BLEND)
  background(0)

  drawStars()

  blendMode(ADD)
  drawNoise(0, 'rgba(255, 255, 255, 0.1)', 0.2)
  drawNoise(10, 'rgba(255, 255, 255, 0.3)', -0.1)
  drawNoise(20, 'rgba(255, 255, 255, 0.6)', 0.1)

  blendMode(BLEND)
  fill('white')
  noStroke()
  circle(540, 770, 75)
  fill('black')
  noStroke()
  circle(575, 755, 90)
}

function drawStars() {
  fill('rgba(255, 255, 255, 1)')
  for (let i = 0; i < 300; i++) {
    let x = 1080 * rand(i) //+ 8 * rand(i + 4) * sin(time * 20 * rand(i + 6))
    let y = 1920 * rand(i + 1)// + time * 100 * rand(i + 3)
    y %= 1920
    circle(x, y, 4 * rand(i + 2) * sin(time * 10 * rand(i + 5)))
  }
}

function frac(n) {
  return n - Math.floor(n)
}

function rand(n) {
  return frac(Math.sin(n) * 43758.5453)
}

function drawNoise(seed, color, speed) {
  noStroke()
  fill(color)

  beginShape()
  for (let i = -1; i <= N + 1; i++) {
    addVertex(i % N, speed, seed)
  }
  endShape()
}

function addVertex(i, speed, seed) {
  let angle, x, y
  angle = i * 2 * PI / N - time * speed
  x = 540 + (rx + rx * 0.1 * (1 + simplex.noise2D(time + seed, i)) * 0.5) * cos(angle)
  y = 1150 + (ry + ry * (1 + simplex.noise2D(i, time + seed)) * 0.5) * sin(angle)

  if (y > 1150) y = 1150 + (y - 1150) * 0.3
  curveVertex(x, y)
}
