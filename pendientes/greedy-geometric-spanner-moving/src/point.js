class Point {
  constructor(cx, cy) {
    this.cx = cx
    this.cy = cy
    this.angle = random(TWO_PI)
    let distance = constrain(dist(cx, cy, width / 2, height / 2), 0, width / 2 - GAP)
    this.radius = map(distance, 0, width / 2 - GAP, width * 0.015, 0)
    this.speed =  random(-0.1, 0.1)
    this.calculateCoords()
  }

  calculateCoords() {
    this.x = this.cx + this.radius * cos(this.angle)
    this.y = this.cy + this.radius * sin(this.angle)
  }

  draw() {
    this.angle += this.speed
    this.calculateCoords()
    push()
    noStroke()
    fill('black')
    translate(this.x, this.y)
    circle(0, 0, 10)
    pop()
  }
}
