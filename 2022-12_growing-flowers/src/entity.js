class Entity {
  constructor() {
    let v1 = p5.Vector.random2D().mult(random(Sketch.radius1))
    let v2 = p5.Vector.random2D().mult(random(Sketch.radius2))
    this.startPosition = createVector(v1.x, v1.y, Sketch.bottomZ)
    this.endPosition = createVector(v2.x, v2.y, Sketch.topZ)
    this.position = this.startPosition.copy()
    this.velocity = createVector()
    this.maxSpeed = random(1, 3)
    this.maxSteer = 0.5
    this.isDead = false
    this.history = []
    this.color = random(colors)
    this.size = random(1, 3)
    this.brightnessTime = random(10)
    this.brightness = noise(this.brightnessTime)
  }

  draw(graphics) {
    this.brightnessTime += 3 * deltaTime / 1000
    this.brightness = map(noise(this.brightnessTime), 0, 1, 0.1, 2)

    if (!this.isDead) {
      this.maxSpeed *= 0.98
      if (this.maxSpeed < 0.5) this.isDead = true

      let separateRange = 200

      let desired1 = SteeringBehaviours.arrive(this, this.endPosition, 250).mult(random([1, 2]))
      let desired2 = SteeringBehaviours.separate(this, Sketch.entities, separateRange).mult(1)
      let desired3 = SteeringBehaviours.wander(this, 2).mult(1)
      let desired = desired1.add(desired2).add(desired3)

      let steer = desired.sub(this.velocity).limit(this.maxSteer)
      this.velocity.add(steer)
      this.position.add(this.velocity)
      this.history.push(this.position.copy())
    }

    graphics.push()
    graphics.noStroke()
    graphics.translate(this.position.x, this.position.y, this.position.z)
    let c = color(this.color)
    c.setRed(this.brightness * red(c))
    c.setGreen(this.brightness * green(c))
    c.setBlue(this.brightness * blue(c))
    graphics.fill(c)
    graphics.sphere(this.size / this.maxSpeed)
    graphics.pop()

    for (let i = 0; i < this.history.length - 1; i++) {
      let p1 = this.history[i]
      let p2 = this.history[i + 1]
      let w = map(i, 0, this.history.length, 3, 0)
      graphics.strokeWeight(w)
      graphics.stroke(255, 200)
      graphics.line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z)
    }
  }
}
