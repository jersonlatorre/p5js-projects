let agents = []
let fps

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
  rectMode(CORNER)
  textAlign(CENTER, CENTER)

  background('white')

  for (let i = 0; i < 300; i++) {
    let agent = new Agent()
    agent.position = new p5.Vector(random(width), random(height))
    agents.push(agent)
  }

  // fps = new Fps()
}

function draw() {
  fill(255, 0.04)
  rect(0, 0, width, height)

  agents.forEach((agent) => {
    agent.draw()
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  window.location = '/'
}