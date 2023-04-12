let sketch
let graphics
let w

function setup() {
  w = min(windowWidth, windowHeight)
  createCanvas(w, w)
  // noiseSeed(fxrandom(0, 1000000))
  graphics = createGraphics(1080, 1080, WEBGL)
  sketch = new Sketch3()
}

function draw() {
  sketch.draw(graphics)
  image(graphics, 0, 0, w, w)
}

function fxrandom(a, b) {
  return a + fxrand() * (b - a)
}
