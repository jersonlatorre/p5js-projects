let N_DIVISIONS = 25

let fMouseX = 0
let fMouseY = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background('white')
  noFill()

  let maxRadius = (max(width, height) * 1.4) | 0

  fMouseX = lerp(fMouseX, mouseX, 0.1)
  fMouseY = lerp(fMouseY, mouseY, 0.1)

  for (let i = N_DIVISIONS; i > 0; i = i--) {
    let radio = i * maxRadius / N_DIVISIONS
    let x = map(i, 0, N_DIVISIONS, fMouseX, width / 2)
    let y = map(i, 0, N_DIVISIONS, fMouseY, height / 2)

    if (i % 2 == 0) {
      fill('white')
    } else {
      fill('black')
    }

    circle(x, y, radio)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
