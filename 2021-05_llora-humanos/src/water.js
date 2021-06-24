class Water {
  constructor(y, hue) {
    this.pool = new Pool(-300, 1380, y, hue)
    this.mouseYPrev = mouseY
    this.y = y
  }

  draw() {
    let force = (mouseY - this.mouseYPrev) * 1.5
    this.mouseYPrev = mouseY

    if (mouseY > this.y - 100 && mouseY < this.y + 100) {
      this.pool.hit(mouseX, force)
    }

    this.pool.draw()
  }

  hit(x, force) {
    this.pool.hit(x, force)
  }
}
