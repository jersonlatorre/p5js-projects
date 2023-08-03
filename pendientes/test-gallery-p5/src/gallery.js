import p from 'p5-sketch'
import { Global } from './global.js'
import { themeColors } from './colors.js'
import gsap from 'gsap'

class Gallery {
  constructor() {
    this.graphics = p.createGraphics(600, 600, p.WEBGL)
    this.xOffset = 0
    this.yOffset = 0
    this.scale = 80
    this.separation = 600
  }

  draw() {
    this.graphics.noStroke()

    gsap.to(this, {
      xOffset: -this.separation * Global.currentIndex,
      duration: 1,
      ease: 'power2.out',
    })

    this.graphics.clear()
    this.graphics.push()
    for (let i = 0; i < 200; i++) {
      this.graphics.translate(p.random(-600, 600), p.random(-600, 600), p.random(0, -600))
      this.graphics.fill(50)
      this.graphics.box(20)
    }
    this.graphics.pop()

    this.graphics.push()
    this.graphics.translate(this.separation * 0 + this.xOffset, this.yOffset, 0)
    this.graphics.rotateX(p.millis() / 2000)
    this.graphics.rotateY(p.millis() / 2000)
    this.graphics.rotateZ(p.millis() / 2000)
    this.graphics.scale(this.scale * 1.1)
    // this.graphics.ambientLight(themeColors[0])
    // this.graphics.fill(themeColors[2])
    this.graphics.specularMaterial('green')
    this.graphics.shininess(0)
    // this.graphics.pointLight(255, 255, 255, 0, 0, 1000)
    // this.graphics.directionalLight(255, 0, 255, 0, 0, -1)
    this.graphics.directionalLight(100, 0, 100, 0.5, 0.5, -1)
    this.graphics.directionalLight(30, 30, 0, 1, -1, 0)
    this.graphics.model(p.icosa)
    this.graphics.pop()

    this.graphics.push()
    this.graphics.translate(this.separation * 1 + this.xOffset, this.yOffset, 0)
    this.graphics.rotateX(p.millis() / 2000)
    this.graphics.rotateY(p.millis() / 2000)
    this.graphics.rotateZ(p.millis() / 2000)
    this.graphics.scale(this.scale)
    // this.graphics.ambientLight(themeColors[0])
    this.graphics.fill(themeColors[1])
    this.graphics.pointLight(255, 255, 255, 0, 0, 10000)
    this.graphics.directionalLight(100, 0, 100, -0.5, 0.5, -1)
    this.graphics.directionalLight(40, 40, 0, 1, -1, 0)
    this.graphics.model(p.hexa)
    this.graphics.pop()

    this.graphics.push()
    this.graphics.translate(this.separation * 2 + this.xOffset, this.yOffset, 0)
    this.graphics.rotateX(p.millis() / 2000)
    this.graphics.rotateY(p.millis() / 2000)
    this.graphics.rotateZ(p.millis() / 2000)
    this.graphics.scale(this.scale * 1.1)
    // this.graphics.ambientLight(themeColors[0])
    this.graphics.fill(themeColors[2])
    this.graphics.pointLight(255, 255, 255, 0, 0, 10000)
    this.graphics.directionalLight(100, 0, 100, -0.5, 0.5, -1)
    this.graphics.directionalLight(40, 40, 0, 1, -1, 0)
    this.graphics.model(p.octa)
    this.graphics.pop()

    this.graphics.push()
    this.graphics.translate(this.separation * 3 + this.xOffset, this.yOffset, 0)
    this.graphics.rotateX(p.millis() / 2000)
    this.graphics.rotateY(p.millis() / 2000)
    this.graphics.rotateZ(p.millis() / 2000)
    this.graphics.scale(this.scale * 1.1)
    // this.graphics.ambientLight(themeColors[0])
    this.graphics.fill(themeColors[3])
    this.graphics.pointLight(255, 255, 255, 0, 0, 10000)
    this.graphics.directionalLight(100, 0, 100, -0.5, 0.5, -1)
    this.graphics.directionalLight(40, 40, 0, 1, -1, 0)
    this.graphics.model(p.icosa)
    this.graphics.pop()

    this.graphics.push()
    this.graphics.translate(this.separation * 4 + this.xOffset, this.yOffset, 0)
    this.graphics.rotateX(p.millis() / 2000)
    this.graphics.rotateY(p.millis() / 2000)
    this.graphics.rotateZ(p.millis() / 2000)
    this.graphics.scale(this.scale * 1.1)
    // this.graphics.ambientLight(themeColors[0])
    this.graphics.fill(themeColors[4])
    this.graphics.pointLight(255, 255, 255, 0, 0, 10000)
    this.graphics.directionalLight(100, 0, 100, -0.5, 0.5, -1)
    this.graphics.directionalLight(40, 40, 0, 1, -1, 0)
    this.graphics.model(p.dodeca)
    this.graphics.pop()

    p.imageMode(p.CENTER)
    p.image(this.graphics, 300, 300)
  }
}

export { Gallery }
