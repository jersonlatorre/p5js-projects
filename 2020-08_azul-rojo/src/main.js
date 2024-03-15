let SIZE = 0
let DOT_SIZE
let NUM_DOTS = 2000

let angle = 0
let simplex = new SimplexNoise()
let marginX, marginY = 0

let fireX, fireY, waterX, waterY

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  noStroke()
  background('black')
}

function draw() {
  blendMode(BLEND)
  fill('rgba(0, 0, 0, 0.5)')
  rect(0, 0, width, height)

  let mean = min(width, height)

  angle += deltaTime / 5000
  marginX = map(cos(angle * 1.3 + PI / 2), -1, 1, width * 0.1, width * 0.5)
  marginY = map(cos(angle * 1.3 + PI / 2), -1, 1, height * 0.1, height * 0.5)

  blendMode(ADD)
  drawStars()
  draWater()
  drawFire()

  let mX = 0.5 * (waterX + fireX)
  let mY = 0.5 * (waterY + fireY)

  let distanceToCenter = dist(mX, mY, width / 2, height / 2)
  distanceToCenter = constrain(distanceToCenter, 0, width / 2)
  let reactionFactor = map(distanceToCenter, 0, width / 2, 1, 0.1)

  let REACTION_DISTANCE = mean * 2
  let dRactionDistance = constrain(
    dist(waterX, waterY, fireX, fireY),
    0,
    REACTION_DISTANCE
  )
  SIZE =
    map(dRactionDistance, 0, REACTION_DISTANCE, width * 0.3, width * 0.2) *
    reactionFactor

  let dSize = constrain(
    dist(waterX, waterY, fireX, fireY),
    0,
    REACTION_DISTANCE
  )
  DOT_SIZE = map(dSize, 0, REACTION_DISTANCE, mean * 0.15, mean * 0.01)
}

function drawStars() {
  for (let i = 0; i < 40; i++) {
    let x = random(width)
    let y = random(height)
    fill('rgba(255, 255, 255, 0.33)')
    circle(x, y, 4)
  }
}

function draWater() {
  let rx = simplex.noise2D(angle, angle)
  let ry = simplex.noise2D(angle, angle + 1)
  waterX = map(rx, -1, 1, marginX, width - marginX)
  waterY = map(ry, -1, 1, marginY, height - marginY)

  for (let i = 0; i < NUM_DOTS; i++) {
    let x = random(width)
    let y = random(height)
    let distance = constrain(dist(waterX, waterY, x, y), 0, SIZE)
    let size = map(distance, 0, SIZE, DOT_SIZE, 0)
    let hue = map(distance, 0, SIZE, 180, 255)
    fill(hue, 255, 255 - hue)
    circle(x, y, size)
  }
}

function drawFire() {
  let rx = simplex.noise2D(angle, angle + 2)
  let ry = simplex.noise2D(angle, angle + 3)
  fireX = map(rx, -1, 1, marginX, width - marginX)
  fireY = map(ry, -1, 1, marginY, height - marginY)

  for (let i = 0; i < NUM_DOTS; i++) {
    let v = p5.Vector.random2D().mult(SIZE)
    let x = fireX + v.x
    let y = fireY + v.y
    let distance = constrain(dist(fireX, fireY, x, y), 0, SIZE)
    let size = map(distance, 0, SIZE, DOT_SIZE, 0)
    let hue = map(distance, 0, SIZE, 180, 255)
    fill(255 - hue * 1.15, 255, 255 - hue)
    circle(x, y, size)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
