function Spring2D(xpos, ypos, m, g) {
  this.x = xpos
  this.y = ypos
  this.vx = 0
  this.vy = 0
  this.mass = m
  this.gravity = g
  this.radius = 30
  this.stiffness = 0.3
  this.damping = 0.7

  this.update = function(targetX, targetY) {
    let forceX = (targetX - this.x) * this.stiffness
    let ax = forceX / this.mass
    this.vx = this.damping * (this.vx + ax)
    this.x += this.vx
    let forceY = (targetY - this.y) * this.stiffness
    forceY += this.gravity
    let ay = forceY / this.mass
    this.vy = this.damping * (this.vy + ay)
    this.y += this.vy
  }

  this.display = function(nx, ny) {
    noStroke()
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    stroke(255)
    line(this.x, this.y, nx, ny)
  }
}
