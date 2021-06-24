function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
}

function draw() {
  translate(1920 - window.screenX, -window.screenY)
  translate(displayWidth / 2, displayHeight / 2)
  background('orange')

  let factor = map(sin(millis() / 500), -1, 1, 1, 1.5)
  
  for (let i = 0; i < 16; i++) {
    let alpha = map(i, 0, 16, 100, 0)
    alpha %= 100
    fill(255, alpha)
    circle(0, 0, 80 * i * factor)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
