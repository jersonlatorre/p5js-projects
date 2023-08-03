import p from 'p5-sketch'
import gsap from 'gsap'
import { Global } from './global.js'

class Circle {
  constructor(x, y, index) {
    this.x = x
    this.y = y
    this.index = index
    this.minOpacity = 0.0
    this.maxOpacity = 1
    this.opacity = this.minOpacity
  }

  draw() {
    p.push()
    p.stroke(`rgba(110, 110, 110, ${this.opacity})`)
    p.strokeWeight(4)
    // p.noStroke()
    p.fill(80)
    p.circle(this.x, this.y, 2 * Global.circleRadius)
    p.pop()

    let distanceToMouse = p.dist(p.mouseX, p.mouseY, this.x, this.y)

    if (distanceToMouse < Global.circleRadius) {
      gsap.to(this, {
        opacity: this.maxOpacity,
        duration: 0.7,
        ease: 'power2.out',
      })

      if (p.mouseIsPressed) {
        Global.currentIndex = this.index
        p.dot.moveTo(this.x, this.index)
      }
    } else {
      gsap.to(this, {
        opacity: this.minOpacity,
        duration: 0.7,
        ease: 'power2.out',
      })
    }
  }
}

export { Circle }
