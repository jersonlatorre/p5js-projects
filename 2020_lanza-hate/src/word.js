class Word {
  constructor(position) {
    this.words = ['fuck u!', 'bastard!', 'pussy!', 'asshole!']
    this.word = random(this.words)
    this.position = position
    this.speed = 6
    this.size = 0
    this.mousePosition = createVector(mouseX, mouseY)
    this.velocity = this.mousePosition.copy().sub(this.position).normalize().mult(this.speed)
  }

  draw() {
    this.size += 0.12 * deltaTime
    if (this.size > 40) this.size = 40
    push()
    translate(this.position.x, this.position.y)
    if (this.mousePosition.x > 400) {
      rotate(this.velocity.heading())
    } else {
      rotate(this.velocity.heading() + PI)
    }
    textSize(this.size)
    textAlign(CENTER, CENTER)
    this.position.add(this.velocity)
    text(this.word, 0, 0)
    pop()
  }
}
