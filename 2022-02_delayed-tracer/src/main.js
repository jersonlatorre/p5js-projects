let N = 300
let FOLLOW_SPEED = 0.4
let THICKNESS = 40

let tracer
let timer = 0

let cursorImg

function preload() {
  cursorImg = loadImage('assets/cursor.svg')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)

  headPosition = createVector()
  tracer = new Tracer()

  cursorImg.resize(80, 0)
  noCursor()
}

function draw() {
  background('black')

  tracer.addPoint(createVector(mouseX, mouseY))

  tracer.draw()
  image(cursorImg, mouseX - 5, mouseY - 5)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
