class Agent {
  constructor() {
    this.position = createVector(random(1080), random(1080))
    this.velocity = createVector()
    this.maxSpeed = 5
    this.maxSteer = 1

    this.size = 22
    this.angle = p5.Vector.random2D().heading()

    this.isDead = false
    this.words = [ 'fear', 'hate' ]
    this.word = random(this.words)
  }

  draw() {
    let desiredAlignment = SteeringBehaviours.alignment(this, Global.agents, 100)
    let desiredCohesion = SteeringBehaviours.cohesion(this, Global.agents, 100)
    let desiredWander = SteeringBehaviours.wander(this, 200, 100)
    let desiredFlee = SteeringBehaviours.flee(this, Global.target, Global.targetSize * 1.2)
    let desiredSeparate = SteeringBehaviours.separate(this, Global.agents, 40)

    let desired = createVector()
      .add(desiredWander.mult(0.2))
      .add(desiredSeparate.mult(1))
      .add(desiredAlignment.mult(1))
      .add(desiredCohesion.mult(1))
      .add(desiredFlee.mult(1000))

    let steer = desired.sub(this.velocity).limit(this.maxSteer)
    this.velocity.add(steer).limit(this.maxSpeed)
    this.position.add(this.velocity)

    if (this.position.x > 1080 + this.size) this.position.x = -this.size
    if (this.position.x < -this.size) this.position.x = 1080 + this.size
    if (this.position.y > 1080 + this.size) this.position.y = -this.size
    if (this.position.y < -this.size) this.position.y = 1080 + this.size

    let distance = dist(this.position.x, this.position.y, Global.target.x, Global.target.y)
    if (distance < Global.targetSize * 0.5) {
      // Global.targetSize += 5
      Global.score++
      explosions.push(new Explosion(this.position.x, this.position.y))
      this.isDead = true
    }

    push()
    this.angle = atan2(this.velocity.y, this.velocity.x)
    // if (this.velocity.mag() != 0) this.angle = atan2(this.velocity.y, this.velocity.x)
    translate(this.position.x, this.position.y)
    rotate(this.angle + 0 * PI)

    fill('black')
    // rectMode(CENTER)
    // rect(0, 0, 70, 30)

    // fill('white')
    textSize(this.size)
    textStyle(BOLD)
    textAlign(CENTER, CENTER)

    // text("><((*>", 0, 0)
    // text(this.word, 0, 0)
    // text('🐟', 0, 0)
    text('><>', 0, 0)

    // imageMode(CENTER)
    // image(fish, 0, 0, this.size, this.size)
    pop()
  }

  squaredDistance(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
  }
}
