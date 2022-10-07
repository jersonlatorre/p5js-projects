class Repulsor {
  constructor(parent) {
    this.parent = parent
    let x = fxrandom(this.parent.graphics.width * 0.05, this.parent.graphics.width * 0.95)
    let y = fxrandom(this.parent.graphics.height * 0.05, this.parent.graphics.height * params.spawnFactor)
    this.position = createVector(x, y)
    this.angle = fxrandomAngle()
    this.size = fxrandom(3, 5)
    this.alpha = fxrandom(80, 255)
  }

  draw(graphics) {
    graphics.push()
    graphics.translate(this.position.x, this.position.y)
    graphics.rotate(this.angle)
    graphics.stroke(255, this.alpha)
    graphics.strokeWeight(2)
    graphics.line(-this.size, -this.size, this.size, this.size)
    graphics.line(-this.size, this.size, this.size, -this.size)
    graphics.pop()
  }
}
