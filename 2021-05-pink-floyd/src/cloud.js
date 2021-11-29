class Cloud {
  constructor() {
    Global.cloud = this
    this.position = createVector()
    this.timer = 0
    this.drops = []
  }

  draw() {
    this.position = p5.Vector.lerp(this.position, p, 0.1)

    this.timer += deltaTime / 1000
    if (this.timer >= random(0.01, 0.02)) {
      this.timer = 0
      this.drops.push(new Drop())
      this.drops.push(new Drop())
    }

    this.drops.forEach((drop, i) => {
      if (drop.isDead) {
        this.drops.splice(i, 1)
      }
    })

    this.drops.forEach((drop) => {
      drop.draw()
    })

    image(cloudImg, this.position.x, this.position.y - width * 0.15)
  }
}
