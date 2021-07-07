let simplex
let font
let fish

let explosions = []

function preload() {
  font = loadFont('assets/Karla-Bold.ttf')
  fish = loadImage('assets/fish.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  simplex = new SimplexNoise()
  for (let i = 0; i < 100; i++) {
    Global.agents.push(new Agent())
  }

  textFont(font)
}

function draw() {
  background('rgba(255, 255, 255, 1)')
  background('white')

  let x = map(simplex.noise2D(millis() / 3000, 0), -1, 1, 0, width)
  let y = map(simplex.noise2D(millis() / 3000, 1), -1, 1, 0, height)

  Global.target = createVector(x, y)
  noStroke()
  fill('black')
  circle(Global.target.x, Global.target.y, Global.targetSize)
  noFill()
  stroke('white')
  strokeWeight(7.5)
  circle(Global.target.x, Global.target.y, Global.targetSize * 0.68)
  
  fill('white')
  textSize(50)
  textStyle(BOLD)
  textAlign(CENTER, CENTER)
  

  Global.agents.forEach((agent, i) => {
    if (agent.isDead) {
      Global.agents.splice(i, 1)
    }
  })

  Global.agents.forEach((agent, i) => {
    agent.draw()
  })

  explosions.forEach((explosion, i) => {
    if (explosion.isDead) {
      explosions.splice(i, 1)
    }
  })

  explosions.forEach((explosion, i) => {
    explosion.draw()
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}