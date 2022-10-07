class MutatedDot {
  constructor(parent, x, y) {
    this.parent = parent
    this.position = createVector(x, y)
    this.direction = p5.Vector.random2D()
    this.velocity = createVector(0, 0)
    this.maxSpeed = 3
    this.maxSteer = 1
    this.offset = random(0, 2 * PI)
    this.angle = 0
    this.speed = Estudio1.params.speed
    this.text = generateRandomName(1)
  }

  draw(graphics) {
    let gap = this.radius * 4
    this.angle += (this.speed * deltaTime) / 1000
    let sinus = sin(this.angle + this.offset)
    this.radius = map(sinus, -1, 1, Estudio1.params.minRadius, Estudio1.params.maxRadius)
    
    let desiredSeparate = SteeringBehaviours.separate(this, this.parent.dots, this.radius).mult(200)
    let desiredWander = SteeringBehaviours.wander(this, 0)
    let desiredInsideRectangle = SteeringBehaviours.insideRectangle(
      this,
      gap,
      gap,
      this.parent.width - 2 * gap,
      this.parent.height - 2 * gap
    ).mult(2)

    let desired = desiredSeparate.add(desiredWander).add(desiredInsideRectangle)
    desired = desired.normalize().mult(this.maxSpeed)
    let steer = desired.sub(this.velocity).limit(this.maxSteer)
    this.velocity.add(steer)
    this.position.add(this.velocity)

    graphics.push()
    
    let angle = atan2(this.velocity.y, this.velocity.x)
    graphics.translate(this.position.x, this.position.y)
    graphics.rotate(angle)

    graphics.noStroke()
    graphics.fill('white')
    graphics.circle(0, 0, this.radius)

    graphics.fill(255, 30)
    graphics.stroke('white')
    graphics.strokeWeight(0.5)
    graphics.circle(0, 0, this.radius * 1.5)
    graphics.circle(0, 0, this.radius * 2)
    graphics.circle(0, 0, this.radius * 2.5)

    graphics.fill(0)
    graphics.noStroke()
    graphics.textAlign(CENTER, CENTER)
    graphics.textSize(22)
    if (frameCount % 4 == 0) this.name = generateRandomName(1)
    graphics.rotate(-angle)
    graphics.text(this.name, 0, -3)

    graphics.pop()
  }
}
