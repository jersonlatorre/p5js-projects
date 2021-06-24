class Agent {
  constructor(i) {
    this.maxSpeed = 0
    this.maxSteer = 0.5
    this.position = new p5.Vector()
    this.velocity = new p5.Vector()

    this.MIN_SPEED = 0.3
    this.MAX_SPEED = 10
    this.minRange = Math.max(width, height) * 0.02
    this.maxRange = Math.max(width, height) * 0.23
    this.minSize = Math.max(width, height) * 0.02
    this.maxSize = Math.max(width, height) * 0.07
    this.color = color(0, 0, random(60, 90))
  }

  draw() {
    let offset = height * 0.1

    if (
      this.position.x < -offset ||
      this.position.x > width + offset ||
      this.position.y > height + offset ||
      this.position.y < -offset
    ) {
      this.position.x = -offset + (width + offset) * Math.random()
      // this.position.x = random(width / 2 - 10, width / 2 + 10)
      this.position.y = -offset + offset * Math.random()
    }

    this.maxSpeed = map(this.position.y, -offset, height + offset, this.MAX_SPEED, this.MIN_SPEED)
    let range = map(this.position.y, -offset, height + offset, this.minRange, this.maxRange)
    let desiredSeparate = SteeringBehaviours.separate(this, agents, range)
    let desired = desiredSeparate.copy()
    let steer = desired.sub(this.velocity).limit(this.maxSteer)

    this.velocity.add(steer)
    this.position.add(this.velocity)

    let size = map(range, this.minRange, this.maxRange, this.minSize, this.maxSize)

    noStroke()
    push()
    translate(this.position.x, this.position.y)
    fill(this.color)
    circle(0, 0, size)

    fill(255)
    circle(0, 0, size * 0.5)

    fill(0)
    circle(0, 0, size * 0.25)
    pop()
  }
}
