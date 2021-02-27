let agents = []
let font

function preload() {
  font = loadFont('assets/Hack-Bold.ttf')
}

function setup() {
  colorMode(HSL, 100, 100, 100)
  createCanvas(windowWidth, windowHeight, WEBGL)
  textFont(font)
  frameRate(60)

  for (let i = 0; i < 600; i++) {
    let agent = new Agent()
    agent.position = new p5.Vector(random(0, width), random(height * 0.5, height))
    agents.push(agent)
  }

  setAttributes('antialias', true)
}

function draw() {
  background(0)
  translate(-width / 2, -height / 2)

  rectMode(CENTER)
  textAlign(CENTER, CENTER)

  agents.forEach((agent) => {
    agent.draw()
  })

  let fps = frameRate()
  fill(255)
  stroke(255)
  textAlign(TOP, LEFT)
  text('FPS: ' + fps.toFixed(0), 10, 20)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  window.location = '/'
}
