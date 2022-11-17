let colors = ['#70d6ff', '#ff70a6', '#ff9770', '#ffd670', '#89ED8D']
let maxIndex

function setup() {
  let w = max(1080, 1920)
  createCanvas(1080, 1920)
  blendMode(MULTIPLY)
  rectMode(CENTER)

  maxIndex = 7
}

function draw() {
  push()
  translate(0, 420)
  background('white')
  drawFractal(width / 2, width / 2, width * fxrandom(0.1, 0.5), 0)
  fxpreview()
  noLoop()
  pop()
  // save()
  setTimeout(() => {
    blendMode(BLEND)
    background('white')
    blendMode(MULTIPLY)
    draw()
  }, 200)
}

function drawFractal(x, y, radius, index) {
  if (index > maxIndex) return
  let r = floor(fxrandom(0, 1) * 5)
  let c = colors[r]

  fill(c)
  noStroke()
  if (index > 0) square(x, y, radius)
  let offset = fxrandom(width * 0.2, width * 0.2)
  let factor = fxrandom(0.48, 0.52)
  index++
  drawFractal(x - radius + fxrandom(-offset, offset), y + fxrandom(-offset, offset), radius * factor, index)
  drawFractal(x + radius + fxrandom(-offset, offset), y + fxrandom(-offset, offset), radius * factor, index)
  drawFractal(x + fxrandom(-offset, offset), y - radius + fxrandom(-offset, offset), radius * factor, index)
  drawFractal(x + fxrandom(-offset, offset), y + radius + fxrandom(-offset, offset), radius * factor, index)

  noLoop()
}

function fxrandom(a, b) {
  return a + fxrand() * (b - a)
}
