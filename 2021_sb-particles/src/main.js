let agents = []
let font
let fps

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

  fps = new Fps()
}

function draw() {
  // translate(-width / 2, -height / 2)
  
  fill(0, 0.01)
  rect(0, 0, width, height)

  rectMode(CENTER)
  textAlign(CENTER, CENTER)

  agents.forEach((agent) => {
    agent.draw()
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  window.location = '/'
}