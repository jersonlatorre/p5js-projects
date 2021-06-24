class Agent {
  constructor() {
    this.position = createVector(random(width), random(height))
    this.velocity = createVector()
    this.maxSpeed = 5
    this.maxSteer = 10

    this.size = 50
    this.angle = p5.Vector.random2D().heading()

    this.isDead = false
  }

  draw() {
    let desiredAlignment = SteeringBehaviours.alignment(this, Global.agents, 50)
    let desiredCohesion = SteeringBehaviours.cohesion(this, Global.agents, 50)
    let desiredWander = SteeringBehaviours.wander(this, 50, 1)
    let desiredFlee = SteeringBehaviours.flee(this, Global.target, Global.targetSize * 1.3)
    let desiredSeparate = SteeringBehaviours.separate(this, Global.agents, 35)

    let desired = createVector()
      .add(desiredWander)
      .add(desiredSeparate)
      .add(desiredAlignment)
      .add(desiredCohesion)
      .add(desiredFlee.mult(1000))

    let steer = desired.sub(this.velocity).limit(this.maxSteer)
    this.velocity.add(steer).limit(this.maxSpeed)
    this.position.add(this.velocity)

    if (this.position.x > width + this.size) this.position.x = -this.size
    if (this.position.x < -this.size) this.position.x = width + this.size
    if (this.position.y > height + this.size) this.position.y = -this.size
    if (this.position.y < -this.size) this.position.y = height + this.size

    let distance = dist(this.position.x, this.position.y, Global.target.x, Global.target.y)
    if (distance < Global.targetSize * 0.5) {
      Global.score++
      explosions.push(new Explosion(this.position.x, this.position.y))
      this.isDead = true
    }

    push()
    this.angle = atan2(this.velocity.y, this.velocity.x)
    translate(this.position.x, this.position.y)
    rotate(this.angle + 0 * PI)

    fill(0)
    noStroke()
    rectMode(CENTER)
    rect(0, 0, 20, 6)

    pop()
  }

  squaredDistance(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
  }
}
