class Drop {
  constructor() {
    this.position = createVector()
    this.position.x = random(Global.cloud.position.x - width * 0.025, Global.cloud.position.x + width * 0.025)
    this.position.y = Global.cloud.position.y - width * random(0.125, 0.14)
    this.velocity = createVector(0, 0, 0)
    this.acceleration = createVector(0, 0.3)

    this.isDead = false
    this.maxDeadDistance = random(width * 0.02, width * 0.15)
    this.originalY = this.position.y
  }

  draw() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)

    let alpha = map(this.position.y - this.originalY, 0, this.maxDeadDistance, 1, 0)

    // fill(30, alpha)
    // noStroke()
    // circle(this.position.x, this.position.y, 10)
    stroke(30, alpha)
    strokeWeight(width * 0.004)
    line(this.position.x, this.position.y, this.position.x, this.position.y + 3)

    this.time += deltaTime / 1000
    if (this.position.y - this.originalY > this.maxDeadDistance) {
      this.isDead = true
    }
  }
}
