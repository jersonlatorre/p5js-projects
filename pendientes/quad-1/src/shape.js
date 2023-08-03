import p from 'p5-sketch'
import Simplex from './simplexnoise'

const COLORS = [
  '#505050', // negro
  '#FF5B65', // rojo
  '#FFA24B', // naranja
  '#FCDF5F', // amarillo
  '#49D8EE', // celeste
  '#F5EFE7', // blanco
]

const simplex = new Simplex(p.random(1000))

export default class Shape {
  constructor(x, y, l, level) {
    this.x = p.floor(x)
    this.y = p.floor(y)
    this.l = p.ceil(l)
    this.size = (p.random(1, 2) | 0) * 6

    this.level = level
    this.tStart = this.y
    this.tEnd = this.y + this.l
    this.color = p.color(p.random(COLORS))
  }

  draw() {
    if (this.level > 0) {
      // p.noStroke()
      // p.fill(this.color)
      // // p.ellipseMode(p.CORNER)
      // p.rectMode(p.CENTER)
      // p.square(this.x + this.l / 2, this.y + this.l / 2, this.l * 0.4, this.l * 0.2)
      // p.fill('rgba(0, 0, 0, 0.06)')
      // p.square(this.x + this.l / 2, this.y + this.l / 2, this.l * 0.2, this.l * 0.1)
      return
    }
    let P = 0.8
    let r = simplex.noise(this.x * 0.002, this.y * 0.002, p.millis() / 2000)

    if (r >= P) return
    p.push()
    // p.strokeCap(p.PROJECT)
    p.strokeCap(p.SQUARE)

    let s = this.l
    p.strokeWeight(this.size)
    p.stroke(COLORS[p.map(r / P, 0, 1, 0, COLORS.length) | 0])


    // p.fill(COLORS[p.map(r / P, 0, 1, 0, COLORS.length) | 0])
    p.translate(this.x + this.l / 2, this.y + this.l / 2)
    p.textFont(p.ahamonoFont)
    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(35)
    p.noFill()
    p.strokeWeight(3)

    switch (p.random([0, 1, 2, 3]) % 4) {
      case 0:
        p.circle(0, 0, 12)
        // p.text('o', 0, 0)
        // p.translate(this.x, this.y)
        // p.line(0, 0, s, 0)
        break
        case 1:
        p.circle(0, 0, 12)
        // p.text('o', 0, 0)
        // p.translate(this.x + this.l, this.y)
        // p.line(0, 0, 0, s)
        break
        case 2:
        p.circle(0, 0, 12)
        // p.text('o', 0, 0)
        // p.translate(this.x + this.l, this.y + this.l)
        // p.line(0, 0, -s, 0)
        break
        case 3:
        p.circle(0, 0, 12)
        // p.text('o', 0, 0)
        // p.translate(this.x + this.l, this.y)
        // p.line(0, 0, 0, s)
        break
    }

    p.pop()
  }
}
