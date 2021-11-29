let SQUARE_SIZE = 25
let p
let points
let colors = [ 'rgb(184,50,50)', 'lightpink', 'darkturquoise', 'royalblue', 'gold', 'mediumpurple' ]

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background('snow')

  p = new PoissonDiskSampling({
    shape: [ windowWidth, windowHeight ],
    minDistance: 60,
    maxDistance: 60,
    tries: 30,
    // distanceFunction: function(point) {
    //   let x = point[0] / 600
    //   let y = point[1] / 600
    //   return sin(x + y)
    // },
    // bias: 0
  })
  points = p.fill()

  let N = floor(width / SQUARE_SIZE) + 1
  let offset = (width - N * SQUARE_SIZE) / 2

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let x = i * SQUARE_SIZE + offset
      let y = j * SQUARE_SIZE + offset
      noFill()
      stroke(180)
      square(x, y, SQUARE_SIZE)
    }
  }

  points.forEach((point) => {
    fill(0)
    noStroke()
    let r = random(0, 3) | 0
    switch (r) {
      case 0: {
        let rotation = random(0, TWO_PI)
        drawTriangle(point[0] - 4, point[1] - 4, 'rgba(0, 0, 0, 0.7)', rotation)
        drawTriangle(point[0], point[1], random(colors), rotation)
        break
      }
      case 1: {
        let rotation = random(0, TWO_PI)
        drawPentagon(point[0] - 4, point[1] - 4, 'rgba(0, 0, 0, 0.7)', rotation)
        drawPentagon(point[0], point[1], random(colors), rotation)
        break
      }
      case 2: {
        let rotation = random(0, TWO_PI)
        drawCircle(point[0] - 3, point[1] - 3, 'rgba(0, 0, 0, 0.7)', rotation)
        drawCircle(point[0], point[1], random(colors), rotation)
        break
      }
    }
  })

  frameRate(1)
}

function drawTriangle(x, y, color, rotation) {
  push()
  translate(x, y)
  rotate(rotation)
  fill(color)

  let radius = 15
  let angle = 0
  let x1 = radius * cos(angle)
  let y1 = radius * sin(angle)
  let x2 = radius * cos(angle + 2 * PI / 3)
  let y2 = radius * sin(angle + 2 * PI / 3)
  let x3 = radius * cos(angle + 4 * PI / 3)
  let y3 = radius * sin(angle + 4 * PI / 3)
  triangle(x1, y1, x2, y2, x3, y3)
  pop()
}

function drawPentagon(x, y, color, rotation) {
  push()
  translate(x, y)
  rotate(rotation)
  fill(color)

  let radius = 13
  let angle = 0
  let x1 = radius * cos(angle)
  let y1 = radius * sin(angle)
  let x2 = radius * cos(angle + 2 * PI / 5)
  let y2 = radius * sin(angle + 2 * PI / 5)
  let x3 = radius * cos(angle + 4 * PI / 5)
  let y3 = radius * sin(angle + 4 * PI / 5)
  let x4 = radius * cos(angle + 6 * PI / 5)
  let y4 = radius * sin(angle + 6 * PI / 5)
  let x5 = radius * cos(angle + 8 * PI / 5)
  let y5 = radius * sin(angle + 8 * PI / 5)

  beginShape()
  vertex(x1, y1)
  vertex(x2, y2)
  vertex(x3, y3)
  vertex(x4, y4)
  vertex(x5, y5)
  endShape(CLOSE)
  pop()
}

function drawCircle(x, y, color, rotation) {
  let resolution = 30
  let angle = 0
  let radius = 9
  fill(color)

  push()
  translate(x, y)
  rotate(rotation)
  beginShape()
  for (let i = 0; i <= resolution + 2; i++) {
    let x = radius * cos(angle)
    let y = radius * sin(angle)
    angle += PI / resolution
    vertex(x, y)
  }
  endShape(CLOSE)
  pop()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
