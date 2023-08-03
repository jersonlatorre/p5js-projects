import p from 'p5-sketch'
import Shape from './shape.js'

let MAX_LEVEL = 8
let PROBABILITY = 0.8
let seedValue = Math.random() * 100
let WIDTH = 1080
let HEIGHT = 1080

p.setup = () => {
  let l = p.min(WIDTH, HEIGHT)
  p.createCanvas(l, l, p.WEBGL)
  p.colorMode(p.HSL)
  p.shapes = []
  p.t = 0

  createFractalQuad(0, 0, l , MAX_LEVEL)
}

p.draw = () => {
  if (p.t > 2) {
    p.t = 0
    for (let shape of p.shapes) {
      shape.change()
    }
  }
  // p.t += p.deltaTime / 250

  p.translate(-p.width / 2, -p.height / 2)
  p.randomSeed(seedValue)
  p.background('black')
  for (let shape of p.shapes) shape.draw()
}

function createShape(x, y, l, level) {
  p.shapes.push(new Shape(x, y, l, level))
}

function createFractalQuad(x, y, l, level) {
  if (level === 0 || (p.random() > PROBABILITY && level <= MAX_LEVEL - 2)) {
    createShape(x, y, l, level)
    return
  }

  createFractalQuad(x, y, l / 2, level - 1)
  createFractalQuad(x, y + l / 2, l / 2, level - 1)
  createFractalQuad(x + l / 2, y, l / 2, level - 1)
  createFractalQuad(x + l / 2, y + l / 2, l / 2, level - 1)
}
