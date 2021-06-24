class Person {
  constructor() {
    Global.person = this
    this.timer = 0
    this.beatCounter = 0

    setInterval(() => {
      this.beatCounter++
      this.beatCounter = this.beatCounter % 3
      if (this.beatCounter == 0 || this.beatCounter == 2) this.beat()
    }, 1000 / 3)
  }

  draw() {
    image(personImg, p.x, p.y + width * 0.017)
    image(heartImg, p.x, p.y + width * 0.002, this.heartScale, this.heartScale)
  }

  beat() {
    this.heartScale = 50

    setTimeout(() => {
      this.heartScale = 45
    }, 120)
  }
}
