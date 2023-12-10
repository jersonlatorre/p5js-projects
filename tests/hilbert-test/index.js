import Hilbert from './lib/hilbert.js'
import SimplexNoise from './lib/simplex-noise.js'
import p from 'p5-sketch'

let N = 6
let SIZE, WIDTH
let points = []
let colors = ['#FF5B65', '#FFA24B', '#FCDF5F', '#49D8EE', '#F5EFE7']

p.setup = () => {
  p.createCanvas(1080, 1080)
  p.colorMode(p.HSB)
  p.strokeCap(p.SQUARE)
  // p.frameRate(7)

  SIZE = 2 ** N
  WIDTH = p.width / SIZE

  for (let index = 0; index < SIZE * SIZE; index++) {
    let [j, i] = Hilbert.hilbertIndexToCoords(index, N)
    let x = i * WIDTH + WIDTH / 2
    let y = j * WIDTH + WIDTH / 2
    points.push({ x, y, color: p.random(colors) })
  }
}

p.draw = () => {
  p.background('#111')

  p.beginShape()
  p.noFill()
  p.stroke('#666')
  p.strokeWeight(WIDTH * 0.1)
  let r = WIDTH * 0.2

  points.forEach((point, i) => {
    let rx = SimplexNoise.noise(point.x, point.y, p.millis() * 0.001)
    let ry = SimplexNoise.noise(point.y, point.x, p.millis() * 0.001)
    let x = point.x + rx * r
    let y = point.y + ry * r
    // p.vertex(x, y)
    p.curveVertex(x, y)
  })
  p.endShape()

  points.forEach((point, i) => {
    // if (i === 0) return
    // if (i === points.length - 1) return
    // if (i % 0 != 0) return
    let rx = SimplexNoise.noise(point.x, point.y, p.millis() * 0.0002)
    let ry = SimplexNoise.noise(point.y, point.x, p.millis() * 0.0005)
    let x = point.x + rx * r
    let y = point.y + ry * r
    p.push()
    p.noStroke()
    rx = p.map(rx, -1, 1, 0, WIDTH * 0.9)
    p.fill(point.color)
    p.circle(x, y, rx)
    p.pop()
  })

  // p.noLoop()
}
