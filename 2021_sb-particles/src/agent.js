class Agent {
  constructor(i) {
    this.maxSpeed = 2
    this.maxSteer = 0.5
    this.position = new p5.Vector()
    this.velocity = new p5.Vector()
    this.minRange = Math.max(width, height) * 0.01
    this.maxRange = Math.max(width, height) * 0.07
    this.minSize = 0
    this.maxSize = Math.max(width, height) * 0.012
    this.isSpecial = Math.random() < 0.0
    this.color = this.isSpecial ? (this.color = color('gold')) : (this.color = color('white'))
  }

  draw() {
    if (
      this.position.x < -50 ||
      this.position.x > width + 50 ||
      this.position.y > height + 50 ||
      this.position.y < height * 0.5
    ) {
      this.position.x = width * Math.random()
      let r = Math.random()
      this.position.y = height * 0.501 + height * 0.099 * r
    }

    let range = map(this.position.y, height * 0.5, height, this.minRange, this.maxRange)
    let desiredSeparate = SteeringBehaviours.separate(this, agents, range)
    let desiredWander = SteeringBehaviours.wander(this, 10, 5)

    let desired = desiredSeparate.add(desiredWander)
    let steer = desired.sub(this.velocity).limit(this.maxSteer)

    this.velocity.add(steer)
    this.position.add(this.velocity)

    noStroke()
    push()
    translate(this.position.x, this.position.y)
    fill(this.color)
    square(0, 0, map(range, this.minRange, this.maxRange, this.minSize, this.maxSize))
    pop()
  }
}
