class Fps {
  constructor() {
    this.numValues = 100
    this.values = []
    this.value = 0

    requestAnimationFrame(() => {
      this.update()
    })
  }

  update() {
    this.values.push(frameRate())

    if (this.values.length > this.numValues) {
      this.values.shift()
    }

    let average = 0
    this.values.forEach((value) => {
      average += value
    })

    average /= this.values.length
    this.value = parseInt(average)

    requestAnimationFrame(() => {
      this.update()
    })
    
    rectMode(CORNER)
    push()
    fill('black')
    translate(0, 0, 0.1)
    rect(0, 0, 72, 32)
    
    fill('white')
    noStroke()
    textAlign(TOP, LEFT)
    text('FPS: ' + this.value, 10, 20)
    pop()
  }
}
