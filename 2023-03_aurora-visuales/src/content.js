class Content {
  constructor() {
    this.graphics = createGraphics(width, height)
    this.N = 100
    this.R1 = width
    this.R2 = width * 0.15
    this.F1 = 0.0025
    this.F2 = 0.01
    this.MIN_BRIGHTNESS = 180
    this.MAX_BRIGHTNESS = 550
    this.bright = this.MIN_BRIGHTNESS

    setInterval(() => {
      this.bright = this.MAX_BRIGHTNESS
      sound.setVolume(1)
      sound.play()
      setTimeout(() => {
        sound.setVolume(0.2, 0.02)
        sound.play()
        this.bright = this.MAX_BRIGHTNESS * 0.65
      }, 280)
    }, 1700)
  }

  draw() {
    let g = this.graphics
    g.background(0)
    g.push()
    g.translate(width / 2, height / 2)
    for (let i = 0; i < this.N; i++) {
      let angle = map(i, 0, this.N, 0, 2 * PI) + PI / 2
      let mx = this.R1 * cos(angle - PI * this.F1)
      let my = this.R1 * sin(angle - PI * this.F1)
      let nx = this.R1 * cos(angle + PI * this.F1)
      let ny = this.R1 * sin(angle + PI * this.F1)
      let px = this.R2 * cos(angle + PI * this.F2)
      let py = this.R2 * sin(angle + PI * this.F2)
      let qx = this.R2 * cos(angle - PI * this.F2)
      let qy = this.R2 * sin(angle - PI * this.F2)
      let x = 0.7 * cos(angle) + 1
      let y = 0.7 * sin(angle) + 1
      let r = noise(millis() / 1000, x, y)
      r = floor(map(r, 0, 1, 100, 255))
      let c = color(colors[i % 5])
      c.setAlpha(r + 1.5 * (this.bright - this.MIN_BRIGHTNESS))

      g.noStroke()
      g.fill(c)
      g.beginShape()
      g.vertex(mx, my)
      g.vertex(nx, ny)
      g.vertex(px, py)
      g.vertex(qx, qy)
      g.endShape()
    }

    this.bright = lerp(this.bright, this.MIN_BRIGHTNESS, 0.15)
    g.fill(this.bright)
    g.circle(0, 0, width * 0.5)
    g.fill(30)
    g.circle(0, 0, width * 0.45)
    g.pop()
  }
}
