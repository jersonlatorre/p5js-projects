let N_DIVISIONS = 25

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background('white')
  noFill()

  let maxRadius = (max(width, height) * 1.4) | 0

  for (let i = N_DIVISIONS; i > 0; i = i - 1) {
    let radio = i * maxRadius / N_DIVISIONS
    let x = map(i, 0, N_DIVISIONS, mouseX, width / 2)
    let y = map(i, 0, N_DIVISIONS, mouseY, height / 2)

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
