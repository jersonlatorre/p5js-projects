class Item {
  constructor(x, y, hue) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 1200)
    this.hue = hue

    this.startScale = 0
    this.endScale = 1
    this.tScale = 0
    this.scale = 0

    this.isDead = false
  }

  draw() {
    this.velocity.add(this.acceleration.copy().mult(deltaTime / 1000))
    this.position.add(this.velocity.copy().mult(deltaTime / 1000))

    this.scale = lerp(this.startScale, this.endScale, easeOut(this.tScale))
    this.tScale += 4 * deltaTime / 1000

    if (this.tScale > 1) this.tScale = 1
    if (this.position.y > 1080) this.isDead = true

    push()
    translate(this.position.x, this.position.y)
    scale(this.scale)
    fill('black')
    image(tear, 0, 30)
    pop()
  }
}
