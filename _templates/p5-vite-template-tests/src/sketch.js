import p from 'p5-sketch'

export default class Sketch {
  constructor() {}

  draw() {
    p.fill('black')
    p.noStroke()
    p.circle(300, 300, 20)
  }
}
