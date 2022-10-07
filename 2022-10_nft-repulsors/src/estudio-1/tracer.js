class Tracer {
  static totalDeads = 0
  static TOTAL_TRACERS = 10
  static MAX_HISTORY = 300

  constructor(parent, x, y) {
    this.parent = parent
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.maxSpeed = fxrandom(params.minSpeed, params.maxSpeed)
    this.maxSteer = params.steer
    this.history = []
    this.isEnd = false
    this.color = colors[parseInt(fxrandom(0, colors.length))]

    Tracer.TOTAL_TRACERS = params.numTracers
  }

  draw(graphics) {
    for (let i = 0; i < this.history.length - 1; i++) {
      let p1 = this.history[i]
      let p2 = this.history[i + 1]
      graphics.stroke(this.color)
      let t = i / this.history.length
      // t = 0.5 + 0.5 * sin(PI * (2 * t - 0.5))
      // t = 4 * t - 4 * t * t
      t = 0.5 + 0.5 * cos(PI * t)
      graphics.strokeWeight(5 * t)
      graphics.strokeCap(SQUARE)
      graphics.line(p1.x, p1.y, p2.x, p2.y)
    }

    if (this.position.y < -100) {
      this.isEnd = true
      Tracer.totalDeads++
    }

    if (this.isEnd) return
    let desiredDown = createVector(0, -this.maxSpeed).mult(params.velocityFactor)
    let desiredSepararte = SteeringBehaviours.separate(this, Estudio1.repulsors, params.separateRange).mult(
      params.separateFactor
    )
    let desiredWander = SteeringBehaviours.wander(this, params.wanderFactor, { maxSpeed: params.wanderSpeed }).mult(1)
    let desired = desiredDown.add(desiredSepararte).add(desiredWander)
    desired = desired.normalize().mult(this.maxSpeed)
    let steer = desired.sub(this.velocity).limit(this.maxSteer)
    this.velocity.add(steer)
    this.position.add(this.velocity)
    this.history.push(this.position.copy())
    if (this.history.length > Tracer.MAX_HISTORY) this.history.shift()
  }
}
