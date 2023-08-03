import p from 'p5-sketch'
import { Easing } from './easing'

const COLORS = [
  '#FF5B65', // rojo
  '#FFA24B', // naranja
  '#FCDF5F', // amarillo
  '#49D8EE', // celeste
  '#F5EFE7', // blanco
  '#323232', // negro
  '#323232', // negro
  '#323232', // negro
  '#323232', // negro
]

export default class Shape {
  constructor(x, y, l, level) {
    this.x = p.floor(x)
    this.y = p.floor(y)
    this.l = p.ceil(l)

    this.level = level
    this.tStart = this.y
    this.tEnd = this.y + this.l

    this.color1 = p.random(COLORS)
    do {
      this.color2 = COLORS[Math.floor(Math.random() * COLORS.length)]
    } while (this.color1 == this.color2)
  }

  draw() {
    let top = p.lerp(this.tStart, this.tEnd, Easing.easeOut(p.t))

    p.push()
    p.noStroke()

    p.fill(p.color(this.color1))
    p.square(this.x, this.y, this.l)

    p.fill(p.color(this.color2))
    p.rect(this.x, this.y, this.l, top - this.y)
    p.pop()
  }

  change() {
    this.t = 0
    this.color1 = this.color2
    // do {
      this.color2 = COLORS[Math.floor(Math.random() * COLORS.length)]
    // } while (this.color1 == this.color2)
  }
}
