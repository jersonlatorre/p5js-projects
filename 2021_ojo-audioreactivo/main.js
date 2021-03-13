let mic

function setup() {
  createCanvas(windowWidth, windowHeight)

  mic = new p5.AudioIn()
  mic.start()
}

function draw() {
  background('white')

  let volume = mic.getLevel()

  let count = map(volume, 0, 1, 5, 20 * sqrt(windowWidth * windowHeight))
  let size = map(volume, 0, 1, 6, height  * 0.3)

  for (let i = 0; i < count; i++) {
    fill('rgba(240, 120, 0, 0.6)')
    noStroke()
    circle(random(width), random(height), size)
    // circle(2 * width * noise(i, 0) - width / 2, 2 * height * noise(i, 1) - height / 2, size)
  }

  fill('black')

  let radius = map(volume, 0, 1, height / 5, height * 2)
  circle(width / 2, height / 2, radius)

  let h = map(volume, 0, 1, height / 50, height * 3)
  rect(0, 0, width, h)
  rect(0, height - h, width, h)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
