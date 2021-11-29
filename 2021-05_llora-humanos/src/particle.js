class Particle {
  constructor(x, y) {
    this.tx = this.vx = this.ox = this.x = x
    this.ty = this.vy = this.oy = this.y = y
  }

  move(tx, ty) {
    // this.tx = (this.tx + tx) * 0.5
    this.ty = (this.ty + ty) * 0.5
  }

  draw() {
    // let nx = (this.x - this.ox) * 0.85
    // this.ox = this.x
    // this.x += (this.tx - this.x) * 0.5 + nx

    let ny = (this.y - this.oy) * 0.9
    this.oy = this.y
    this.y += (this.ty - this.y) * 0.3 + ny

    // this.tx += (this.vx - this.tx) * 0.5
    this.ty += (this.vy - this.ty) * 0.5
  }
}
