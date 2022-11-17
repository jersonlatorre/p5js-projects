let sketch
let graphics
let size

function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size)
  sketch = new Sketch()
  graphics = createGraphics(1080, 1080, WEBGL)
}

function draw() {
  background(0)
  sketch.draw(graphics)
  image(graphics, 0, 0, size, size)
}

function fxrandom(a, b) {
  if (b === undefined) return fxrand() * a
  return a + fxrand() * (b - a)
}
