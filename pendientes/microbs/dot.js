class Dot {
  constructor() {
    this.position = createVector(random(width), random(height))

    this.state = 'moving'
    this.history = []
    this.time = random(this.MIN_IDLE_TIME, this.MAX_IDLE_TIME)

    let root = sqrt(width * height)
    this.HISTORY_LENGTH = 6
    this.THICKNESS = root * 0.015
    this.THICKNESS_FACTOR = 0.6
    this.MIN_RANGE = root * 0.02
    this.MAX_RANGE = root * 0.06
    this.MIN_SPEED = 0.01
    this.MAX_SPEED = 0.06
    this.MIN_IDLE_TIME = 0.1
    this.MAX_IDLE_TIME = 1

    this.color1 = color('rgba(255, 255, 255, 1)')
    this.color2 = color('rgba(0, 0, 0, 1)')
    this.idleDuration = random(this.MIN_IDLE_TIME, this.MAX_IDLE_TIME)
    this.speed = random(this.MIN_SPEED, this.MAX_SPEED)
    this.radius = random(this.MIN_RANGE, this.MAX_RANGE)
    this.prepareMove()
  }

  draw() {
    switch (this.state) {
      case 'idle': {
        this.time += deltaTime / 1000

        if (this.time > this.idleDuration) {
          this.prepareMove()
          this.state = 'moving'
        }

        this.history.push(this.position)
        if (this.history.length > this.HISTORY_LENGTH) {
          this.history.shift()
        }

        for (let i = 0; i < this.history.length - 1; i++) {
          let p1 = this.history[i]
          let p2 = this.history[i + 1]
          strokeWeight(this.THICKNESS)
          stroke(this.color1)
          line(p1.x, p1.y, p2.x, p2.y)
        }

        strokeWeight(this.THICKNESS * this.THICKNESS_FACTOR)
        stroke(this.color2)
        let first = this.history[0]
        let last = this.history[this.history.length - 1]
        line(first.x, first.y, last.x, last.y)

        noStroke()
        fill(this.color2)
        circle(this.position.x, this.position.y, this.THICKNESS * this.THICKNESS_FACTOR)

        break
      }

      case 'moving': {
        this.position = p5.Vector.lerp(this.start, this.end, this.t)
        this.t += this.speed

        if (this.t > 1) {
          this.prepareIdle()
          this.state = 'idle'
        }

        this.history.push(this.position)
        if (this.history.length > this.HISTORY_LENGTH) {
          this.history.shift()
        }

        for (let i = 0; i < this.history.length - 1; i++) {
          let p1 = this.history[i]
          let p2 = this.history[i + 1]
          strokeWeight(this.THICKNESS)
          stroke(this.color1)
          line(p1.x, p1.y, p2.x, p2.y)
        }

        strokeWeight(this.THICKNESS * this.THICKNESS_FACTOR)
        stroke(this.color2)
        let first = this.history[0]
        let last = this.history[this.history.length - 1]
        line(first.x, first.y, last.x, last.y)

        break
      }
    }
  }

  prepareMove() {
    this.start = this.position.copy()
    // this.direction = random([ createVector(0, 1), createVector(1, 0), createVector(0, -1), createVector(-1, 0) ])
    this.direction = p5.Vector.random2D()
    this.end = this.position.copy().add(this.direction.copy().mult(this.radius))

    while (
      this.end.x < 0 ||
      this.end.x > width ||
      this.end.y < 0 ||
      this.end.y > height
    ) {
      // this.direction = random([ createVector(0, 1), createVector(1, 0), createVector(0, -1), createVector(-1, 0) ])
      this.direction = p5.Vector.random2D()
      this.end = this.position.copy().add(this.direction.copy().mult(this.radius))
    }

    this.t = 0
    // this.history = []
  }

  prepareIdle() {
    this.time = 0
  }
}
