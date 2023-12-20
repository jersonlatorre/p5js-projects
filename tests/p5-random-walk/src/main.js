let cam
let aux

let particles = []
let SIZE = 200
let MIN_AMPLITUDE = 0.005
let drawer

function setup() {
  pixelDensity(1)
  createCanvas(400, 400, WEBGL)

  calculateCoordinates()

  setInterval(() => {
    calculateCoordinates()
  }, 1000)

  for (let i = 0; i < 500; i++) {
    particles.push(new Particle())
  }

  aux = createGraphics(SIZE, SIZE, WEBGL)
  drawer = new Drawer(aux)
}

function draw() {
  translate(-width / 2, -height / 2)
  background(255)

  // tint(255, 0)
  // image(aux, 0, 0, 400, 400)
  // tint(255)

  for (let i = 0; i < particles.length; i++) {
    particles[i].move()
    particles[i].draw()
  }

  // se dibuja la imagen
  drawer.draw()

}

function calculateCoordinates() {
  x = random(-SIZE / 2, SIZE / 2)
  y = random(-SIZE / 2, SIZE / 2)
}

class Drawer {
  constructor(aux) {
    this.g = aux
    this.angle = 0
    this.radius = 50

    this.positions = []
    this.calculateRandomPositions()
    setInterval(() => {
      this.calculateRandomPositions()
    }, 2000)
  }

  calculateRandomPositions() {
    this.positions = []
    for (let i = 0; i < 10; i++) {
      let x = random(-SIZE / 2, SIZE / 2)
      let y = random(-SIZE / 2, SIZE / 2)
      let size = random(20, 60)
      this.positions.push([x, y, size])
    }
  }
  
  draw() {
    let g = this.g
    g.background(255)
    g.fill(0)

    
    for (let i = 0; i < this.positions.length; i++) {
      g.rectMode(CENTER)
      let x = this.positions[i][0]
      let y = this.positions[i][1]
      let size = this.positions[i][2]
      // g.fill(0, 10)
      // g.noStroke()
      g.square(x, y, size)
    }
    
    // image(g, 0, 0, 400, 400)
    // let x = cos(this.angle) * this.radius
    // let y = sin(this.angle) * this.radius
    // g.circle(x, y, 40)
    
    
    this.angle += 0.02
  }
}
