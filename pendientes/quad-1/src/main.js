import p from 'p5-sketch'
import Shape from './shape.js'

let MAX_LEVEL = 6
let PROBABILITY = 1
let seedValue = Math.random() * 100
let GAP = 0
let WIDTH = 1080
let HEIGHT = 1080

p.preload = () => {
  p.ahamonoFont = p.loadFont('../assets/AHAMONO-Monospaced.otf')
}

p.setup = () => {
  let l = p.min(WIDTH, HEIGHT)
  p.createCanvas(l, l, p.WEBGL)
  p.colorMode(p.HSL)
  p.t = 0
  p.shapes = []

  // p.frameRate(20)
  // p.blendMode(p.MULTIPLY)
  // p.blendMode(p.ADD)
  createFractalQuad(GAP, GAP, l - 2 * GAP, MAX_LEVEL)
}

p.draw = () => {
  p.clear()
  p.background('#F5EFE7')
  p.background('#181818')
  p.translate(-p.width / 2, -p.height / 2)
  p.randomSeed(seedValue)
  for (let shape of p.shapes) shape.draw()
  // p.noLoop()
}

function createShape(x, y, l, level) {
  p.shapes.push(new Shape(x, y, l, level))
}

function createFractalQuad(x, y, l, level) {
  if (level == 0 || (p.random() > PROBABILITY && level <= MAX_LEVEL - 2)) {
    createShape(x, y, l, level)
    return
  }
  createFractalQuad(x, y, l / 2, level - 1)
  createFractalQuad(x, y + l / 2, l / 2, level - 1)
  createFractalQuad(x + l / 2, y, l / 2, level - 1)
  createFractalQuad(x + l / 2, y + l / 2, l / 2, level - 1)
}
