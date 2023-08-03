class Agent {
  constructor() {
    this.position = createVector()
    this.velocity = createVector()
    this.desired = createVector()
    this.maxSpeed = 5
    this.maxSteer = 0.5
  }

  addSeek({ targetPosition, range, weight }) {
    range = range || Infinity
    weight = weight == undefined ? 1 : weight

    let desired = createVector()
    if (this.position.dist(targetPosition) < range) {
      desired = p5.Vector.sub(targetPosition, this.position).setMag(this.maxSpeed)
    }
    this.desired.add(desired.mult(weight))
  }

  addFlee({ targetPosition, range, weight }) {
    range = range || Infinity
    weight = weight == undefined ? 1 : weight

    let desired = createVector()
    if (this.position.dist(targetPosition) < range) {
      desired = p5.Vector.sub(this.position, targetPosition).setMag(this.maxSpeed)
    }
    this.desired.add(desired.mult(weight))
  }

  addArrive({ targetPosition, range, arriveDistance, weight }) {
    range = range || Infinity
    arriveDistance = arriveDistance == undefined ? 50 : arriveDistance
    weight = weight == undefined ? 1 : weight

    let desired = createVector()
    let distance = this.position.dist(targetPosition)
    if (distance < range) {
      if (distance > arriveDistance) {
        desired = p5.Vector.sub(targetPosition, this.position).setMag(this.maxSpeed)
      } else {
        let speed = map(distance, 0, arriveDistance, 0, this.maxSpeed)
        desired = p5.Vector.sub(targetPosition, this.position).setMag(speed)
      }
    }
    this.desired.add(desired.mult(weight))
  }

  addSeparate({ neighbors, separation, weight }) {
    neighbors = neighbors || []
    separation = separation == undefined ? 50 : separation
    weight = weight == undefined ? 1 : weight

    let desired = createVector()
    let count = 0
    for (let other of neighbors) {
      let distance = this.position.dist(other.position)
      if (distance > 0 && distance < separation) {
        let diff = p5.Vector.sub(this.position, other.position).normalize().div(distance)
        desired.add(diff)
        count++
      }
    }
    if (count > 0) {
      desired.div(count)
      desired.normalize().mult(this.maxSpeed)
    }
    this.desired.add(desired.mult(weight))
  }

  addWander({ strength, weight }) {
    strength = (strength || 1) / 10
    weight = weight == undefined ? 1 : weight

    let wanderRadius = 1
    let wanderDistance = wanderRadius * strength
    let wanderAngle = random(TWO_PI)
    let wanderDirection = p5.Vector.fromAngle(wanderAngle).mult(wanderRadius)
    let wanderPosition = this.position.copy().add(wanderDirection)
    wanderPosition.add(this.velocity.copy().mult(wanderDistance))
    let desired = wanderPosition.sub(this.position).setMag(this.maxSpeed)
    this.desired.add(desired.mult(weight))
  }

  addInsideRectangle({ x, y, w, h, weight, margin }) {
    x = x == undefined ? 0 : x
    y = y == undefined ? 0 : y
    w = w == undefined ? width : w
    h = h == undefined ? height : h
    weight = weight == undefined ? 1 : weight
    margin = margin == undefined ? 0 : margin

    if (
      this.position.x < x + margin ||
      this.position.x > x + w - margin ||
      this.position.y < y + margin ||
      this.position.y > y + h - margin
    ) {
      let center = createVector(x + width / 2, y + height / 2)
      let desired = center.sub(this.position).setMag(this.maxSpeed)
      this.desired.add(desired.mult(weight))
    }
  }

  addInsideCircle({ x, y, radius, weight, margin }) {
    x = x == undefined ? 0 : x
    y = y == undefined ? 0 : y
    radius = radius == undefined ? 100 : radius
    weight = weight == undefined ? 1 : weight
    margin = margin == undefined ? 0 : margin

    if (this.position.dist(createVector(x, y)) > radius - margin) {
      let desired = createVector(x, y).sub(this.position).setMag(this.maxSpeed)
      this.desired.add(desired.mult(weight))
    }
  }

  update() {
    let steer = p5.Vector.sub(this.desired, this.velocity).limit(this.maxSteer)
    this.velocity.add(steer)
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity)
    this.desired.mult(0)
  }
}
