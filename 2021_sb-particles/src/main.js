let agents = []
let font
let fps
let fg

function preload() {
  font = loadFont('assets/Hack-Bold.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  textFont(font)
  frameRate(60)
  colorMode(HSB)
  background('black')

  for (let i = 0; i < 600; i++) {
    let agent = new Agent()
    agent.position = new p5.Vector(random(width), random(height))
    agents.push(agent)
  }

  fg = createGraphics(windowWidth, windowHeight, WEBGL)
  // fps = new Fps()
}

function draw() {
  // translate(-width / 2, -height / 2)
  background(0, 0.01)

  rectMode(CENTER)
  textAlign(CENTER, CENTER)

  agents.forEach((agent) => {
    agent.draw()
  })

  // fg.fill(0, 0)
  // fg.noFill()
  // fg.stroke('white')
  // fg.push()
  // fg.rotate(millis() / 1000)
  // fg.box(100)
  // fg.pop()
  // image(fg, 0, 0)

  // rectMode(CENTER)
  // fill(255, 0.9)
  // rect(width / 2, height / 2, width, 200)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  window.location = '/'
}
