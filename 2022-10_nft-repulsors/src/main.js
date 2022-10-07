let windowManager
let graphics
let drawer
let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let params = {}
let size

function setup() {
  let minSpeed = fxrandom(4, 8)
  params = {
    numRepulsors: 10 * parseInt(fxrandom(20, 110) / 10),
    numTracers: 10 * parseInt(fxrandom(40, 90) / 10),
    minSpeed: minSpeed,
    maxSpeed: minSpeed + fxrandom(2, 10),
    steer: fxrandom(0.1, 10),
    velocityFactor: fxrandom(2, 20),
    separateFactor: fxrandom(2, 5),
    separateRange: fxrandom(60, 200),
    wanderFactor: fxrandom(1, 100),
    wanderSpeed: fxrandom(0, 3),
    spawnFactor: fxrandom(0.7, 0.9),
  }

  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
  graphics = createGraphics(1080, 1080)
  drawer = new Estudio1(graphics)
}

function fxrandom(a, b) {
  return a + fxrand() * (b - a)
}

function fxrandomAngle() {
  let angle = fxrand() * 2 * PI
  return angle
}

function draw() {
  drawer.draw()
  image(graphics, 0, 0, size, size)
}
