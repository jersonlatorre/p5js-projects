import p from 'p5-sketch'
import gsap from 'gsap'
import { themeColors } from './colors.js'
import { Global } from './global.js'

class Dot {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.px = x
    this.py = y
    this.color = color
  }

  draw() {
    this.px = p.lerp(this.px, this.x, 0.3)
    this.py = p.lerp(this.py, this.y, 0.3)
    let distance = p.dist(this.px, this.py, this.x, this.y)
    let weight = p.map(distance, 0, 100, Global.lineWeight, 5)

    p.push()
    p.stroke(this.color)
    p.strokeWeight(weight)
    p.line(this.px, this.py, this.x, this.y)
    p.pop()
  }

  moveTo(x, index) {
    gsap.to(this, {
      color: themeColors[index],
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(this, {
      x: x,
      duration: 0.3,
      ease: 'power2.out',
    })
  }
}

export { Dot }
