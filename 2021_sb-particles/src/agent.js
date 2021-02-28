class Agent {
  constructor(i) {
    this.maxSpeed = 5
    this.maxSteer = 0.5
    this.position = new p5.Vector()
    this.velocity = new p5.Vector()
    this.minRange = Math.max(width, height) * 0.02
    this.maxRange = Math.max(width, height) * 0.16
    this.minSize = 5
    this.maxSize = Math.max(width, height) * 0.04
    this.isSpecial = Math.random() < 0.5
    this.color = color(random(360), 0, random(10, 80))
  }
  
  draw() {
    if (
      this.position.x < -200 ||
      this.position.x > width + 200 ||
      this.position.y > height + 200 ||
      this.position.y < -200
      ) {
        this.position.x = -200 + (width + 200) * Math.random()
        this.position.y = -250 + 200 * Math.random()
        this.color = color(random(360), random(100), 100)
    }

    this.maxSpeed = map(this.position.y, -200, height + 200, 18, 0.3)
    let range = map(this.position.y, -200, height + 200, this.minRange, this.maxRange)
    let desiredSeparate = SteeringBehaviours.separate(this, agents, range)
    let desiredWander = createVector()
    // let desiredWander = SteeringBehaviours.flee(this, createVector(width / 2, height / 2), width / 4).mult(2)
    // let desiredWander = SteeringBehaviours.wander(this, 100, 10)

    let desired = desiredSeparate.copy().add(desiredWander)
    let steer = desired.sub(this.velocity).limit(this.maxSteer)

    this.velocity.add(steer)
    this.position.add(this.velocity)

    noStroke()
    push()
    translate(this.position.x, this.position.y)
    fill(this.color)
    circle(0, 0, map(range, this.minRange, this.maxRange, this.minSize, this.maxSize))
    pop()
  }
}
