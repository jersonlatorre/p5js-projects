let factor = 1080 / 1080
let simplex
let font
let fish

let explosions = []

function preload() {
  font = loadFont('assets/Karla-Bold.ttf')
  fish = loadImage('assets/fish.png')
}

function setup() {
  createCanvas(1080 * factor, 1080 * factor)
  simplex = new SimplexNoise()
  for (let i = 0; i < 180; i++) {
    Global.agents.push(new Agent())
  }

  textFont(font)
}

function draw() {
  background('rgba(255, 255, 255, 1)')
  background('white')
  scale(factor)

  let x = 540 + 480 * simplex.noise2D(millis() / 3000, 0)
  let y = 540 + 480 * simplex.noise2D(millis() / 3000, 100)

  Global.target = createVector(x, y)
  noStroke()
  fill('black')
  circle(Global.target.x, Global.target.y, Global.targetSize)

  fill('white')
  textSize(50)
  textStyle(BOLD)
  textAlign(CENTER, CENTER)
  text(Global.score, Global.target.x, Global.target.y - 5)
  // text('🦈', Global.target.x, Global.target.y - 5)
  

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
