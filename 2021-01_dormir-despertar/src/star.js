class Star {
  constructor() {
    this.x = random(1080)
    this.y = random(1920)
    this.maxSize = random(1, 7)
    this.speed = random(0.5, 2)
    this.seed = random(100)
    this.twinkleSpeed = random(1, 4)
  }

  draw() {
    let size = this.maxSize * sin(Global.time * this.twinkleSpeed + this.seed)
    
    let speedFactor = map(easeJump(Global.t), 0, 1, 1, 20)
    this.x += this.speed * speedFactor
    
    if (this.x > 1080) {
      this.x -= 1080
    }

    ellipse(this.x, this.y, size * speedFactor, size / speedFactor)
  }
}
