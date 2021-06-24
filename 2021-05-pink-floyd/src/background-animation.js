class BackgroundAnimation {
  constructor() {
    this.waves = []
    for (let i = 0; i < 20; i++) {
      this.waves.push(new Wave(i * height / 19))
    }
  }

  draw() {
    background(0, 0, 95)
    // this.waves.forEach(wave => {
    //   wave.draw()
    // })
  }
}

class Wave {
  constructor(h) {
    this.h = h
  }

  draw() {
    for (let i = 0; i < 100; i++) {
      let x1 = i * width / 100
      let y1 = this.h + 10 * sin(x1 / 20)

      let x2 = (i + 1) * width / 100
      let y2 = this.h + 10 * sin(x2 / 20)

      stroke(255, 0.1)
      strokeWeight(width / 30)
      line(x1, y1, x2, y2)
    }
  }
}
