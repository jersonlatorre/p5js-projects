let simplex
let font
let size = 1080
let factor = size / 600

function preload() {
  font = loadFont('assets/Nosifer.ttf')
}

function setup() {
  createCanvas(size, size * 16 / 9, WEBGL)
  colorMode(HSB)
  simplex = new SimplexNoise()
  textFont(font)
  setAttributes('antialias', true)
}

function draw() {
  translate(-size / 2, -size * 16 / 18)
  let time = millis() / 10
  let rx = 4 * factor * simplex.noise2D(time, 0)
  let ry = 4 * factor * simplex.noise2D(0, time)
  translate(rx, ry)

  background('rgba(0, 0, 0, 100)')
  textAlign(CENTER)

  let yOffset = size * 0.42
  fill('red')

  textSize(70 * factor)
  text('#MERINO', size / 2, 4.55 * size / 10 + yOffset)

  textSize(74 * factor)
  text('ASESINO', size / 2, 5.7 * size / 10 + yOffset)

  for (let i = 0; i < 5000; i++) {
    fill('rgba(255, 255, 255, 0.5)')
    noStroke()
    circle(random(size), random(size * 16 / 9), random(0.5, 1.2) * factor)
  }

  save('frame' + frameCount.toString().padStart(4, "0") + '.png')
  if (frameCount == 400) noLoop()
}
