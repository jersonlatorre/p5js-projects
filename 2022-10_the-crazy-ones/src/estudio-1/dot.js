class Dot {
  constructor(parent, x, y) {
    this.parent = parent
    this.position = createVector(x, y)
    this.direction = p5.Vector.random2D()
    this.velocity = createVector(0, 0)
    this.maxSpeed = 0
    this.maxSteer = 1
    this.offset = random(0, 2 * PI)
    this.angle = 0
    this.speed = Estudio1.params.speed
  }

  draw(graphics) {
    this.angle += (this.speed * deltaTime) / 1000

    let gap = this.radius * 40
    this.radius = 15
    this.maxSpeed = 2
    let desiredSeparate = SteeringBehaviours.separate(this, this.parent.dots, this.radius * 2).mult(200)
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
    graphics.fill('black')
    graphics.circle(0, 0, this.radius)

    graphics.fill(0, 30)
    graphics.stroke('black')
    graphics.strokeWeight(0.5)
    graphics.circle(0, 0, this.radius * 0)

    graphics.pop()
  }
}
