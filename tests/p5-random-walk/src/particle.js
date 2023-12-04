class Particle {
  constructor() {
    this.x = random(0, 1)
    this.y = random(0, 1)
    this.initialX = this.x
    this.initialY = this.y
    this.stochasticAmplitude
    this.color
    this.updateOffsets()
    this.eq = 0
    this.time = random(100)
  }

  move() {
    let colorArray = aux.get(this.x * SIZE, this.y * SIZE)
    let targetEq = colorArray[1] / 255
    this.eq = lerp(this.eq, targetEq, 1)

    // this.color = color(colorArray[0], colorArray[1], colorArray[2])
    // set the amplitude of the move -> proportional to the vibration

    this.color = color(0, 0, 0)
    this.stochasticAmplitude = 0.9 * this.eq

    if (this.stochasticAmplitude <= MIN_AMPLITUDE) this.stochasticAmplitude = MIN_AMPLITUDE

    this.time += 0.1
    // perform one random walk
    // this.x = this.initialX + 0.1 * noise(this.time, 0)
    // this.y = this.initialY + 0.1 * noise(0, this.time)
    this.x += random(-this.stochasticAmplitude, this.stochasticAmplitude)
    this.y += random(-this.stochasticAmplitude, this.stochasticAmplitude)

    this.updateOffsets()
  }

  updateOffsets() {
    // handle edges
    if (this.x < 0) this.x += 1
    if (this.x >= 1) this.x -= 1
    if (this.y <= 0) this.y += 1
    if (this.y >= 1) this.y -= 1

    // convert to screen space
    this.xOff = width * this.x // (this.x + 1) / 2 * width;
    this.yOff = height * this.y // (this.y + 1) / 2 * height;
  }

  draw() {
    noStroke()
    fill(0)
    circle(this.xOff, this.yOff, 2)
  }
}
